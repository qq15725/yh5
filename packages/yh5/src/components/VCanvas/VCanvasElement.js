// Helpers
import mixins from '../../util/mixins'

// Mixins
import { VSketchElement } from '../VSketch'

const baseMixins = mixins(
  VSketchElement
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas-element',

  computed: {
    classes () {
      return {
        'v-canvas-element': true,
        ...(VSketchElement.options.computed.classes.call(this)),
      }
    },
  },
})