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
      if (this.lazy) {
        return [{
          name: 'intersect',
          value: entries => this.show = entries[0].isIntersecting,
        }]
      }
      return []
    }
  },

  render (h) {
    let element

    if (this.lazy && !this.show) {
      element = h('div', {
        class: this.classes,
        style: this.styles,
        directives: this.directives,
      })
    } else if (this.$scopedSlots && this.$scopedSlots.render) {
      element = this.$scopedSlots.render(this.$attrs)
      if (Array.isArray(element) && element.length === 1) {
        element = element[0]
      }
      if (!element || Array.isArray(element) || !element.tag) {
        return element
      }
      element.data = element.data || {}
      element.data.class = this.classes
      element.data.style = this.styles
      element.data.directives = this.directives
      element.data.on = this.$listeners
    } else {
      element = h(this.tag, {
        attrs: this.$attrs,
        class: this.classes,
        style: this.styles,
        on: this.$listeners,
        directives: this.directives,
      }, this.$slots.default)
    }

    return this.genTransition(element)
  }
})