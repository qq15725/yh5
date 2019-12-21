// Helpers
import mixins from '../../util/mixins'

// Components
import VDraggable from '../VDraggable'
import VResizable from '../VResizable'

const baseMixins = mixins(
  VDraggable,
  VResizable,
)

export default baseMixins.extend({
  name: 'v-draggable-and-resizable',

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
  },

  computed: {
    resizableStyles () {
      return VResizable.options.computed.styles.call(this)
    },
    styles () {
      return Object.assign({}, this.resizableStyles, VDraggable.options.computed.styles.call(this))
    },
  },

  methods: {
    handleMove (event) {
      let value = Object.assign({}, this.internalValue)
      if (this.direction) {
        value = Object.assign(value, VResizable.options.methods.handleMove.call(this, event))
        // 上
        if (this.direction.indexOf('n') > -1) {
          value.top = this.originalValue.top + event.dragOffsetY
        }
        // 左
        if (this.direction.indexOf('w') > -1) {
          value.left = this.originalValue.left + event.dragOffsetX
        }
        return value
      }
      return Object.assign(value, VDraggable.options.methods.handleMove.call(this, event))
    },
    genGrip (grip) {
      const element = VResizable.options.methods.genGrip.call(this, grip)

      if (element && !this.direction && this.originalValue !== null) {
        element.data.staticClass += ' v-resizable__grip--hide'
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
      staticClass: 'v-draggable-and-resizable v-resizable',
      class: this.classes,
      style: this.styles,
      on,
    }, [
      !this.disabled && this.genGrips(),

      this.$scopedSlots.default && this.$scopedSlots.default({
        style: this.resizableStyles,
        value: this.internalValue,
      }),
    ])
  }
})