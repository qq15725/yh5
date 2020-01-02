// Helpers
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

// Directives
import { createHandlers } from '../../directives/draggable'

// Mixins
import Proxyable from '../../mixins/proxyable'

const baseMixins = mixins(
  Proxyable
)

export default baseMixins.extend({
  name: 'v-draggable',

  props: {
    value: {
      type: Object,
      default: () => ({
        top: 0,
        left: 0,
      }),
    },
    absolute: {
      type: Boolean,
      default: true,
    },
    fixed: Boolean,
    cursor: {
      type: [Boolean, String],
      default: 'move'
    },
    disabled: Boolean,
    axis: {
      type: String,
      default: 'both',
      validator: val => ['x', 'y', 'both'].includes(val)
    },
    grid: [String, Number, Array],
    parent: {
      type: [Boolean, String],
      default: false,
    },
  },

  data () {
    return {
      originalValue: null,
      parentWidth: null,
      parentHeight: null,
    }
  },

  watch: {
    parent () {
      this.$nextTick(() => {
        [this.parentWidth, this.parentHeight] = this.getParentSize()
      })
    },
  },

  mounted () {
    [this.parentWidth, this.parentHeight] = this.getParentSize()
  },

  computed: {
    styles () {
      let style = {}

      let left = convertToUnit(this.internalValue.left)
      let top = convertToUnit(this.internalValue.top)

      if (this.absolute) style.position = 'absolute'
      if (this.fixed) style.position = 'fixed'
      if (!this.disabled && this.cursor) style.cursor = this.cursor
      if (left) style.left = left
      if (top) style.top = top

      return style
    },
    computedGrid () {
      if (typeof this.grid === 'string') return [Number(this.grid), Number(this.grid)]
      if (typeof this.grid === 'number') return [this.grid, this.grid]
      return this.grid
    },
  },

  methods: {
    getParentSize () {
      if (!this.parent) return [null, null]
      const target = typeof this.parent === 'string' ? document.querySelector(this.parent) : this.$el.parentNode
      const style = window.getComputedStyle(target, null)
      return [
        parseInt(style.getPropertyValue('width'), 10),
        parseInt(style.getPropertyValue('height'), 10)
      ]
    },
    handleEdge (value) {
      if (this.parentHeight) {
        value.top = Math.max(value.top, 0)
        value.top = Math.min(value.top, this.parentHeight - this.$el.offsetHeight)
      }
      if (this.parentWidth) {
        value.left = Math.max(value.left, 0)
        value.left = Math.min(value.left, this.parentWidth - this.$el.offsetWidth)
      }
      return value
    },
    snapToGrid (value) {
      if (!this.computedGrid) return value
      const [gridX, gridY] = this.computedGrid
      if (gridX) value.left = Math.round(value.left / gridX) * gridX
      if (gridY) value.top = Math.round(value.top / gridY) * gridY
      return value
    },
    handleMove (event) {
      return {
        left: this.axis === 'y' ? this.originalValue.left : this.originalValue.left + event.dragOffsetX,
        top: this.axis === 'x' ? this.originalValue.top : this.originalValue.top + event.dragOffsetY,
      }
    },
    emitMoveEvent () {
      this.$emit('dragging', this.internalValue)
    },
    emitEndEvent () {
      this.$emit('dragstop', this.internalValue)
    },
    onStart (event) {
      this.originalValue = Object.assign({}, this.internalValue)
      event.preventDefault()
      event.stopPropagation()
    },
    onMove (event) {
      if (!this.originalValue) return
      let value = this.handleMove(event)
      value = this.snapToGrid(value)
      value = this.handleEdge(value)
      this.internalValue = value
      this.emitMoveEvent && this.emitMoveEvent()
      event.preventDefault()
      event.stopPropagation()
    },
    onEnd (event) {
      this.originalValue = null
      this.emitEndEvent && this.emitEndEvent()
      event.preventDefault()
      event.stopPropagation()
    },
    genListeners () {
      return createHandlers({
        start: this.onStart,
        move: this.onMove,
        end: this.onEnd,
      })
    },
  },

  render () {
    if (!this.$scopedSlots.default && this.value === undefined) {
      return null
    }

    let element

    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({
        value: this.internalValue,
        style: this.styles,
        active: this.originalValue !== null,
      })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!element || Array.isArray(element) || !element.tag) {
      return element
    }

    if (!this.disabled) {
      element.data = element.data || {}
      element.data.on = element.data.on || {}
      this._g(element.data, this.genListeners())
    }

    return element
  }
})