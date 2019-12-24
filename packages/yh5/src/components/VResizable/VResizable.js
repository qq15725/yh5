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

export const defaultPoints = ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']

export default baseMixins.extend({
  name: 'v-resizable',

  props: {
    value: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0
      }),
    },
    absolute: Boolean,
    cursor: Boolean,
    minWidth: [String, Number],
    maxWidth: [String, Number],
    minHeight: [String, Number],
    maxHeight: [String, Number],
    hideGripBreakpoint: {
      type: [String, Number],
      default: 50
    },
    points: {
      type: Array,
      default: () => defaultPoints,
      validator: val => new Set(val.filter(h => new Set(defaultPoints).has(h))).size === val.length
    },
    aspectRatio: [String, Number],
  },

  data () {
    return {
      point: null,
    }
  },

  computed: {
    classes () {
      return {
        'v-resizable--disabled': this.disabled,
        'v-resizable--resizing': this.point !== null,
      }
    },
    styles () {
      let style = {}

      let width = convertToUnit(this.internalValue.width)
      let height = convertToUnit(this.internalValue.height)

      if (this.absolute) style.position = 'absolute'
      if (this.fixed) style.position = 'fixed'
      if (!this.disabled && this.cursor) style.cursor = this.cursor
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
    computedHideGripBreakpoint () {
      return Number(this.hideGripBreakpoint)
    },
  },

  methods: {
    handleBoundary (value) {
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
    handleGrid (value) {
      if (!this.computedGrid) return value
      const [gridX, gridY] = this.computedGrid
      if (gridX) value.width = Math.round(value.width / gridX) * gridX
      if (gridY) value.height = Math.round(value.height / gridY) * gridY
      return value
    },
    convertToAspectRatio (value) {
      if (!this.computedAspectRatio || !this.point) return value
      if (this.point.indexOf('l') > -1 || this.point.indexOf('r') > -1) {
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
      if (this.point) {
        if (this.point.indexOf('l') > -1) {
          value.width = this.originalValue.width - event.dragOffsetX
        } else if (this.point.indexOf('r') > -1) {
          value.width = this.originalValue.width + event.dragOffsetX
        }

        if (this.point.indexOf('t') > -1) {
          value.height = this.originalValue.height - event.dragOffsetY
        } else if (this.point.indexOf('b') > -1) {
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
    genPoint (point) {
      const isInBreakpoint = this.internalValue.width <= this.computedHideGripBreakpoint
        || this.internalValue.height <= this.computedHideGripBreakpoint

      return this.$createElement('div', {
        staticClass: `v-resizable__point v-resizable__point--${point}`,
        style: {
          padding: isInBreakpoint ? 0 : ''
        },
        class: {
          'v-resizable__point--resizing': this.point && this.point === point,
          'v-resizable__point--hide': this.point && this.point !== point || (isInBreakpoint && ['br', 'b', 'r'].indexOf(point) === -1),
        },
        on: createHandlers({
          start: event => {
            this.point = point
            this.onStart(event)
          },
          move: this.onMove,
          end: event => {
            this.onEnd(event)
            this.point = null
          },
        }),
      }, [
        this.$slots[point] || this.$createElement('div', {
          staticClass: 'v-resizable__point--grip'
        })
      ])
    },
    genPoints () {
      return this.points.map(this.genPoint)
    },
  },

  render (h) {
    return h('div', {
      staticClass: 'v-resizable',
      class: this.classes,
      style: this.styles,
    }, [
      !this.disabled && this.genPoints(),

      h('div', {
        staticClass: 'v-resizable__wrapper',
      }, [
        this.$scopedSlots.default && this.$scopedSlots.default({
          value: this.internalValue,
          style: this.defaultSlotStyles,
          active: this.originalValue !== null,
        })
      ])
    ])
  }
})