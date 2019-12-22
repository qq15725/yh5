// Scss
import './VElement.scss'

// Helpers
import mixins from '../../util/mixins'

// Mixins
import Positionable from '../../mixins/positionable'
import Measurable from '../../mixins/measurable'
import Transitionable from '../../mixins/transitionable'

const baseMixins = mixins(
  Positionable,
  Measurable,
  Transitionable
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-element',

  props: {
    tag: null,
  },

  computed: {
    classes () {
      return {
        'v-element': true,
        'v-element--absolute': this.absolute,
        'v-element--fixed': this.fixed,
      }
    },
    styles () {
      return {
        ...this.animationableStyles,
        ...this.measurableStyles,
        ...this.positionableStyles,
      }
    },
  },

  render (h) {
    return this.genTransition(
      h(this.tag, {
        attrs: this.$attrs,
        class: this.classes,
        style: this.styles,
        on: this.$listeners,
      }, this.$slots.default)
    )
  }
})