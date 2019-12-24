// Helpers
import mixins from '../../util/mixins'

// Components
import VDraggable from '../VDraggable'
import VResizable from '../VResizable'

const baseMixins = mixins(
  VResizable,
)

export default baseMixins.extend({
  name: 'v-draggable-resizable',

  props: {
    value: {
      type: Object,
      default: () => ({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      })
    },
    absolute: {
      type: Boolean,
      default: true,
    },
    cursor: {
      type: [Boolean, String],
      default: 'move'
    },
  },

  computed: {
    resizableDefaultSlotStyles () {
      return VResizable.options.computed.defaultSlotStyles.call(this)
    },
    styles () {
      return Object.assign(
        VResizable.options.computed.styles.call(this),
        VDraggable.options.computed.styles.call(this)
      )
    },
  },

  methods: {
    handleBoundary (value) {
      return Object.assign(
        VResizable.options.methods.handleBoundary.call(this, value),
        VDraggable.options.methods.handleBoundary.call(this, value)
      )
    },
    handleGrid (value) {
      if (!this.computedGrid) return value
      const [gridX, gridY] = this.computedGrid
      if (gridX) {
        value.width = Math.round(value.width / gridX) * gridX
        value.left = Math.round(value.left / gridX) * gridX
      }
      if (gridY) {
        value.height = Math.round(value.height / gridY) * gridY
        value.top = Math.round(value.top / gridY) * gridY
      }
      return value
    },
    handleMove (event) {
      let value = Object.assign({}, this.internalValue)
      if (this.point) {
        if (this.point.indexOf('t') > -1) {
          value.top = this.originalValue.top + event.dragOffsetY
        }
        if (this.point.indexOf('l') > -1) {
          value.left = this.originalValue.left + event.dragOffsetX
        }
        return Object.assign({}, value, VResizable.options.methods.handleMove.call(this, event))
      }
      return Object.assign({}, value, VDraggable.options.methods.handleMove.call(this, event))
    },
    emitMoveEvent () {
      if (this.point) {
        VResizable.options.methods.emitMoveEvent.call(this)
      } else {
        VDraggable.options.methods.emitMoveEvent.call(this)
      }
    },
    emitEndEvent () {
      if (this.point) {
        VResizable.options.methods.emitEndEvent.call(this)
      } else {
        VDraggable.options.methods.emitEndEvent.call(this)
      }
    },
    genPoint (point) {
      const element = VResizable.options.methods.genPoint.call(this, point)

      if (element && !this.point && this.originalValue !== null) {
        element.data.staticClass += ' v-resizable__point--hide'
      }

      return element
    },
  },

  render (h) {
    let on = this.$listeners

    if (!this.disabled) {
      on = on || {}
      on = Object.assign(on, this.genListeners())
    }

    return h('div', {
      staticClass: 'v-draggable-resizable v-resizable',
      class: this.classes,
      style: this.styles,
      on,
    }, [
      !this.disabled && this.genPoints(),

      h('div', {
        staticClass: 'v-resizable__wrapper',
      }, [
        this.$scopedSlots.default && this.$scopedSlots.default({
          style: this.resizableDefaultSlotStyles,
          value: this.internalValue,
          active: this.originalValue !== null
        }),
      ]),
    ])
  }
})