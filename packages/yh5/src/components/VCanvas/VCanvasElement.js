import './VCanvasElement.scss'

// Helpers
import mixins from '../../util/mixins'

// Mixins
import { VSketchElement } from '../VSketch'

// Directives
import intersect from '../../directives/intersect'

const baseMixins = mixins(
  VSketchElement
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas-element',

  props: {
    lazy: Boolean,
    lazyOnce: Boolean,
  },

  data () {
    return {
      show: false,
    }
  },

  directives: {
    intersect,
  },

  computed: {
    classes () {
      return {
        'v-canvas-element': true,
        ...(VSketchElement.options.computed.classes.call(this)),
        'v-position--absolute': this.sketch && this.sketch.absolute,
        'v-position--fixed': this.sketch && this.sketch.fixed,
      }
    },
    directives () {
      if (this.lazy || this.lazyOnce) {
        return [{
          name: 'intersect',
          value: (entries, observer, isIntersecting) => {
            if (this.show && this.lazyOnce) return
            this.show = isIntersecting
          },
        }]
      }
      return []
    }
  },

  render (h) {
    let element = null

    if (!this.lazy || this.show) {
      if (this.$scopedSlots.default) {
        element = this.$scopedSlots.default()
      }

      if (this.tag) {
        element = h(this.tag, {
          attrs: this.$attrs,
          on: this.$listeners,
        }, element)
      }
    }

    return this.genTransition(h('div', {
      class: this.classes,
      style: this.styles,
      directives: this.directives,
    }, element))
  }
})