// Scss
import './VElement.scss'

// Helpers
import mixins from '../../util/mixins'
import mergeData from '../../util/mergeData'

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

  name: 'v-element',

  props: {
    index: Number
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
    refLines () {
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
    if (!this.$scopedSlots.default) {
      console.warn('v-element is missing a default scopedSlot', this)

      return null
    }

    let element

    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default()
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!element || Array.isArray(element) || !element.tag) {
      return element
    }

    element.data = mergeData(element.data || {}, {
      class: this.classes,
      style: this.styles
    })

    return this.genTransition(element)
  }
})