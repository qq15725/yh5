// Scss
import './VElement.scss'

// Helpers
import mixins from '../../util/mixins'

// Mixins
import Positionable from '../../mixins/positionable'
import Measurable from '../../mixins/measurable'
import Transitionable from '../../mixins/transitionable'
import SketchItem from '../../mixins/sketch-item'
import SizeBootable from '../../mixins/size-bootable'
import PositionBootable from '../../mixins/position-bootable'

const baseMixins = mixins(
  Positionable,
  Measurable,
  Transitionable,
  SketchItem,
  SizeBootable,
  PositionBootable,
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-element',

  props: {
    tag: null,
  },

  mounted () {
    if (!this.height || !this.width) {
      this.sizeBoot()
    }
    if (!this.top || !this.left) {
      this.positionBoot()
    }
  },

  computed: {
    classes () {
      return {
        'v-element': true,
        ...this.positionableClasses,
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