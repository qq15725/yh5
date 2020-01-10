// Scss
import './VDraggableResizablePanel.scss'

// Helpers
import mixins from '../../util/mixins'

// Components
import VDraggableResizable from '../VDraggableResizable'

const baseMixins = mixins(
  VDraggableResizable,
)

export default baseMixins.extend({
  name: 'v-draggable-resizable-panel',

  computed: {
    classes () {
      return {
        'v-draggable-resizable-panel': true,
        ...(VDraggableResizable.options.computed.classes.call(this)),
      }
    },
    isInBreakpoint () {
      return false
    },
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-draggable-resizable-panel__wrapper',
        style: this.defaultSlotStyles,
      }, this.$slots.default)
    },
    genDefaultPointGrip () {
      return this.$createElement('div', {
        staticClass: 'v-draggable-resizable-panel__point--grip'
      })
    },
  },
})