// Scss
import './VSketchElement.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

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
  RegistrableInject('sketch')
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-sketch-element',

  props: {
    tag: null,
    index: Number,
  },

  created () {
    this.sketch && this.sketch.register(this)
  },

  beforeDestroy () {
    this.sketch && this.sketch.unregister(this)
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
        'v-sketch-element': true,
        ...this.positionableClasses,
      }
    },
    internalLeft () {
      return this.convertToResponsive(this.left, 'left')
    },
    internalTop () {
      return this.convertToResponsive(this.top, 'top')
    },
    internalWidth () {
      return this.convertToResponsive(this.width, 'width')
    },
    internalHeight () {
      return this.convertToResponsive(this.height, 'height')
    },
    measurableStyles () {
      const styles = {}

      const height = convertToUnit(this.internalHeight)
      const maxHeight = convertToUnit(this.convertToResponsive(this.maxHeight, 'maxHeight'))
      const minHeight = convertToUnit(this.convertToResponsive(this.minHeight, 'minHeight'))
      const width = convertToUnit(this.internalWidth)
      const maxWidth = convertToUnit(this.convertToResponsive(this.maxWidth, 'maxWidth'))
      const minWidth = convertToUnit(this.convertToResponsive(this.minWidth, 'minWidth'))

      if (height) styles.height = height
      if (maxHeight) styles.maxHeight = maxHeight
      if (minHeight) styles.minHeight = minHeight
      if (width) styles.width = width
      if (maxWidth) styles.maxWidth = maxWidth
      if (minWidth) styles.minWidth = minWidth

      return styles
    },
    positionableStyles () {
      const styles = {}

      const top = convertToUnit(this.internalTop)
      const left = convertToUnit(this.internalLeft)
      const right = convertToUnit(this.convertToResponsive(this.right, 'right'))
      const bottom = convertToUnit(this.convertToResponsive(this.bottom, 'bottom'))

      if (top) styles.top = top
      if (left) styles.left = left
      if (right) styles.right = right
      if (bottom) styles.bottom = bottom

      return styles
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
        vt: Number(this.internalTop),
        vm: parseInt(Number(this.internalTop) + Number(this.internalHeight) / 2),
        vb: Number(this.internalTop) + Number(this.internalHeight),
        hl: Number(this.internalLeft),
        hm: parseInt(Number(this.internalLeft) + Number(this.internalWidth) / 2),
        hr: Number(this.internalLeft) + Number(this.internalWidth),
      }
    },
  },

  methods: {
    convertToResponsive (value, attr) {
      if (!this.sketch) {
        return value
      }
      return this.sketch.convertToResponsive(value, attr)
    },
  },

  render (h) {
    let element = null

    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default()
    }

    if (this.tag) {
      element = h(this.tag, {
        attrs: this.$attrs,
        on: this.$listeners,
      }, element)
    }

    return this.genTransition(h('div', {
      class: this.classes,
      style: this.styles,
      directives: this.directives,
    }, element))
  }
})