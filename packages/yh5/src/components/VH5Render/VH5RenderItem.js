// Helpers
import mixins from '../../util/mixins'
import { parseStyleText } from '../../util/helpers'

// Mixins
import Measurable from '../../mixins/measurable'
import Transitionable from '../../mixins/transitionable'

const baseMixins = mixins(
  Measurable,
  Transitionable
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-h5-render-item',

  props: {
    tag: null,
    position: {
      type: String,
      default: 'absolute'
    },
    appear: {
      type: Boolean,
      default: true
    },
  },

  render (h) {
    const measurableStyles = this.measurableStyles

    let { style, ...attrs } = this.$attrs

    if (typeof style === 'string') {
      style = parseStyleText(style)
    }
    
    style = {
      ...style,
      ...this.animationableStyles,
      ...measurableStyles
    }

    let item = h(this.tag, {
      staticClass: 'v-h5-render-item',
      class: attrs.class,
      attrs,
      style,
      on: this.$listeners,
    }, this.$slots.default)

    return this.genTransition(item)
  }
})