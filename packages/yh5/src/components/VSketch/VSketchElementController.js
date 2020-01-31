// Scss
import './VSketchElementController.scss'

// Helpers
import mixins from '../../util/mixins'

// Components
import VDraggableResizable from '../VDraggableResizable'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

const baseMixins = mixins(
  VDraggableResizable,
  RegistrableInject('sketch'),
)

export default baseMixins.extend({
  name: 'v-sketch-element-controller',

  methods: {
    handleAdsorption (value) {
      if (this.sketch.refLines.length) {
        this.sketch.refLines.forEach(([item]) => {
          switch (item.direction) {
            case 'hl':
              value.left = item.left
              break
            case 'hm':
              value.left = item.left - value.width / 2
              break
            case 'hr':
              value.left = item.left - value.width
              break
            case 'vt':
              value.top = item.top
              break
            case 'vm':
              value.top = item.top - value.height / 2
              break
            case 'vb':
              value.top = item.top - value.height
              break
          }
        })
      }
      return value
    },
    emitMoveEvent (value) {
      if (this.handle) {
        this.$emit('resizing', value)
      } else {
        this.$emit('dragging', value)
      }
    },
    onMove (event) {
      if (!this.originalValue) return
      let value = this.handleMove(event)
      this.emitMoveEvent(value)
      value = this.handleAdsorption(value)
      value = this.snapToGrid(value)
      value = this.handleEdge(value)
      this.internalValue = value
      if (event instanceof MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
  },

  render (h) {
    const element = VDraggableResizable.options.render.call(this, h)

    element.data.staticClass = 'v-sketch-element-controller'

    return element
  }
})