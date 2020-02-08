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
      }
    },
    directives () {
      if (this.lazy || this.lazyOnce) {
        return [{
          name: 'intersect',
          value: (entries, observer, isIntersecting) => {
            console.log(isIntersecting)
            if (this.show && this.lazyOnce) return
            this.show = isIntersecting
          },
        }]
      }
      return []
    }
  },

  render (h) {
    let children = []

    if (!this.lazy || this.show) {
      if (this.$scopedSlots && this.$scopedSlots.render) {
        children = this.$scopedSlots.render({
          ...this.$attrs,
          on: this.$listeners
        })
      } else {
        children = h(this.tag, {
          attrs: this.$attrs,
          on: this.$listeners,
        }, this.$slots.default)
      }
    }

    return this.genTransition(h('div', {
      class: this.classes,
      style: this.styles,
      directives: this.directives,
    }, [
      children
    ]))
  }
})