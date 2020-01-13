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
        width: null,
        height: null,
      })
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    styles () {
      return Object.assign(
        VResizable.options.computed.styles.call(this),
        VDraggable.options.computed.styles.call(this)
      )
    },
  },

  methods: {
    handleEdge (value) {
      return Object.assign(
        VResizable.options.methods.handleEdge.call(this, value),
        VDraggable.options.methods.handleEdge.call(this, value)
      )
    },
    snapToGrid (value) {
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
      if (this.handle) {
        if (this.handle.indexOf('t') > -1) {
          value.top = this.originalValue.top + event.dragOffsetY
        }
        if (this.handle.indexOf('l') > -1) {
          value.left = this.originalValue.left + event.dragOffsetX
        }
        return Object.assign({}, value, VResizable.options.methods.handleMove.call(this, event))
      }
      return Object.assign({}, value, VDraggable.options.methods.handleMove.call(this, event))
    },
    emitMoveEvent () {
      if (this.handle) {
        VResizable.options.methods.emitMoveEvent.call(this)
      } else {
        VDraggable.options.methods.emitMoveEvent.call(this)
      }
    },
    emitEndEvent () {
      if (this.handle) {
        VResizable.options.methods.emitEndEvent.call(this)
      } else {
        VDraggable.options.methods.emitEndEvent.call(this)
      }
    },
    genHandle (handle) {
      const element = VResizable.options.methods.genHandle.call(this, handle)

      if (element && !this.handle && this.originalValue !== null) {
        element.data.staticClass += ' v-resizable__handle--hide'
      }

      return element
    },
    genContent () {
      return this.$scopedSlots.default && this.$scopedSlots.default({
        on: this.draggable ? this.genListeners() : {},
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
      !this.disabled && this.resizable && this.genHandles(),

      h('div', {
        staticClass: 'v-resizable__wrapper',
      }, [
        this.genContent(),
      ]),
    ])
  }
})