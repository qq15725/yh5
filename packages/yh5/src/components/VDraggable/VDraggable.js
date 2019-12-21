import Vue from 'vue'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Directives
import { createHandlers } from '../../directives/draggable'

export default Vue.extend({
  name: 'v-draggable',

  props: {
    value: {
      type: Object,
      default: () => ({
        top: 0,
        left: 0,
      })
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
  },

  data () {
    return {
      lazyValue: this.value,
      originalValue: null,
    }
  },

  watch: {
    value (val) {
      this.lazyValue = val
    },
  },

  computed: {
    internalValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        this.lazyValue = val
        this.$emit('input', val)
      },
    },
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
  },

  methods: {
    handleMove (event) {
      return {
        left: this.originalValue.left + event.dragOffsetX,
        top: this.originalValue.top + event.dragOffsetY,
      }
    },
    onStart (event) {
      this.originalValue = Object.assign({}, this.internalValue)
      event.preventDefault()
      event.stopPropagation()
    },
    onMove (event) {
      if (!this.originalValue) return

      this.internalValue = this.handleMove(event)
      event.preventDefault()
      event.stopPropagation()
    },
    onEnd (event) {
      this.originalValue = null
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

    /* istanbul ignore else */
    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({
        value: this.internalValue,
        style: this.styles,
      })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!element || Array.isArray(element) || !element.tag) {
      return element
    }

    if (!this.disabled) {
      element.data.on = element.data.on || {}
      this._g(element.data, this.genListeners())
    }

    return element
  }
})