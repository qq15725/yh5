// Scss
import './VCanvasElement.scss'

// Helpers
import mixins from '../../util/mixins'

// Mixins
import Positionable from '../../mixins/positionable'
import Measurable from '../../mixins/measurable'
import Transitionable from '../../mixins/transitionable'
import SizeBootable from '../../mixins/size-bootable'
import PositionBootable from '../../mixins/position-bootable'
import { inject as RegistrableInject } from '../../mixins/registrable'

const baseMixins = mixins(
  Positionable,
  Measurable,
  Transitionable,
  SizeBootable,
  PositionBootable,
  RegistrableInject('canvas')
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas-element',

  props: {
    tag: {
      required: true,
    },
    index: Number,
  },

  created () {
    this.canvas && this.canvas.register(this)
  },

  beforeDestroy () {
    this.canvas && this.canvas.unregister(this)
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
        'v-canvas-element': true,
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
    refPoints () {
      return {
        vt: Number(this.top),
        vm: Number(this.top) + Number(this.height) / 2,
        vb: Number(this.top) + Number(this.height),
        hl: Number(this.left),
        hm: Number(this.left) + Number(this.width) / 2,
        hr: Number(this.left) + Number(this.width),
      }
    },
  },

  render (h) {
    return this.genTransition(h(this.tag, {
      attrs: this.$attrs,
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
    }, this.$slots.default))
  }
})