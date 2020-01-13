// Scss
import './VResizable.scss'

// Components
import VDraggable from '../VDraggable'

// Directives
import { createHandlers } from '../../directives/draggable'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

const baseMixins = mixins(
  VDraggable
)

export const defaultHandles = ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']

export default baseMixins.extend({
  name: 'v-resizable',

  props: {
    value: {
      type: Object,
      default: () => ({
        width: null,
        height: null
      }),
    },
    minWidth: [String, Number],
    maxWidth: [String, Number],
    minHeight: [String, Number],
    maxHeight: [String, Number],
    breakpoint: {
      type: [String, Number],
      default: 50
    },
    handles: {
      type: Array,
      default: () => defaultHandles,
      validator: val => new Set(val.filter(h => new Set(defaultHandles).has(h))).size === val.length
    },
    aspectRatio: [String, Number],
    outlined: Boolean,
    point: Boolean,
  },

  data () {
    return {
      handle: null,
      cursorMap: {
        t: 'ns-resize',
        tl: 'nwse-resize',
        l: 'ew-resize',
        b: 'ns-resize',
        bl: 'nesw-resize',
        tr: 'nesw-resize',
        r: 'ew-resize',
        br: 'nwse-resize',
      },
    }
  },

  mounted () {
    if (!this.height || !this.width) {
      this.internalValue.height = this.$el.offsetHeight
      this.internalValue.width = this.$el.offsetWidth
    }
  },

  computed: {
    classes () {
      return {
        'v-resizable': true,
        'v-resizable--outlined': this.outlined,
        'v-resizable--disabled': this.disabled,
        'v-resizable--activated': this.originalValue !== null,
      }
    },
    styles () {
      let style = {}

      let width = convertToUnit(this.internalValue.width)
      let height = convertToUnit(this.internalValue.height)

      if (this.absolute) style.position = 'absolute'
      if (this.fixed) style.position = 'fixed'
      if (width) style.width = width
      if (height) style.height = height

      return style
    },
    defaultSlotStyles () {
      let style = {}

      let width = convertToUnit(this.internalValue.width)
      let height = convertToUnit(this.internalValue.height)

      if (width) style.width = width
      if (height) style.height = height

      return style
    },
    computedAspectRatio () {
      return Number(this.aspectRatio)
    },
    computedBreakpoint () {
      return Number(this.breakpoint)
    },
    inBreakpoint () {
      return this.internalValue.width <= this.computedBreakpoint
        || this.internalValue.height <= this.computedBreakpoint
    },
  },

  methods: {
    handleEdge (value) {
      const minHValues = [parseInt(this.minHeight) || 0, value.height, 0]
      const minWValues = [parseInt(this.minWidth) || 0, value.width, 0]
      const maxHValues = []
      const maxWValues = []
      if (parseInt(this.maxHeight)) maxHValues.push(parseInt(this.maxHeight))
      if (this.parentHeight) maxHValues.push(this.parentHeight)
      if (parseInt(this.maxWidth)) maxWValues.push(parseInt(this.maxWidth))
      if (this.parentWidth) maxWValues.push(this.parentWidth)
      value.height = Math.min(Math.max(...minHValues), ...maxHValues)
      value.width = Math.min(Math.max(...minWValues), ...maxWValues)
      return value
    },
    snapToGrid (value) {
      if (!this.computedGrid) return value
      const [gridX, gridY] = this.computedGrid
      if (gridX) value.width = Math.round(value.width / gridX) * gridX
      if (gridY) value.height = Math.round(value.height / gridY) * gridY
      return value
    },
    convertToAspectRatio (value) {
      if (!this.computedAspectRatio || !this.handle) return value
      if (this.handle.indexOf('l') > -1 || this.handle.indexOf('r') > -1) {
        value.height = value.width * this.computedAspectRatio
      } else {
        value.width = value.height / this.computedAspectRatio
      }
      return value
    },
    handleMove (event) {
      let value = {
        width: this.internalValue.width,
        height: this.internalValue.height,
      }
      if (this.handle) {
        if (this.handle.indexOf('l') > -1) {
          value.width = this.originalValue.width - event.dragOffsetX
        } else if (this.handle.indexOf('r') > -1) {
          value.width = this.originalValue.width + event.dragOffsetX
        }

        if (this.handle.indexOf('t') > -1) {
          value.height = this.originalValue.height - event.dragOffsetY
        } else if (this.handle.indexOf('b') > -1) {
          value.height = this.originalValue.height + event.dragOffsetY
        }

        value = this.convertToAspectRatio(value)
      }
      return value
    },
    emitMoveEvent () {
      this.$emit('resizing', this.internalValue)
    },
    emitEndEvent () {
      this.$emit('resizestop', this.internalValue)
    },
    genDefaultHandle ({ on, style }) {
      return this.$createElement('div', {
        staticClass: this.point ? 'v-resizable__handle--point' : 'v-resizable__handle--line',
        style,
        on,
      })
    },
    genHandle (handle) {
      const props = {
        on: createHandlers({
          start: event => {
            this.handle = handle
            this.onStart(event)
          },
          move: this.onMove,
          end: event => {
            this.onEnd(event)
            this.handle = null
          },
        }),
        style: {
          cursor: this.cursorMap[handle],
        },
        inBreakpoint: this.inBreakpoint
      }

      return this.$createElement('div', {
        staticClass: `v-resizable__handle v-resizable__handle--${handle}`,
        class: {
          'v-resizable__handle--resizing': this.handle && this.handle === handle,
          'v-resizable__handle--hide': this.handle && this.handle !== handle || (this.inBreakpoint && ['br', 'b', 'r'].indexOf(handle) === -1),
        },
      }, [
        this.$scopedSlots[handle]
          ? this.$scopedSlots[handle](props)
          : this.genDefaultHandle(props)
      ])
    },
    genHandles () {
      return this.handles.map(this.genHandle)
    },
    genContent () {
      return this.$scopedSlots.default && this.$scopedSlots.default({
        value: this.internalValue,
        style: this.defaultSlotStyles,
        active: this.originalValue !== null
      })
    },
  },

  render (h) {
    return h('div', {
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
    }, [
      !this.disabled && this.genHandles(),

      h('div', {
        staticClass: 'v-resizable__wrapper',
      }, [
        this.genContent(),
      ])
    ])
  }
})