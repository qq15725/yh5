import './VResponsive.scss'

// Mixins
import Measurable from '../../mixins/measurable'

// Utils
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Measurable).extend({
  name: 'v-responsive',

  props: {
    aspectRatio: [String, Number],
  },

  computed: {
    computedAspectRatio () {
      return Number(this.aspectRatio)
    },
    aspectStyle () {
      return this.computedAspectRatio
        ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined
    },
    __cachedSizer () {
      if (!this.aspectStyle) return []

      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer',
      })
    },
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content',
      }, this.$slots.default)
    },
  },

  render (h) {
    return h('div', {
      staticClass: 'v-responsive',
      style: this.measurableStyles,
      on: this.$listeners,
    }, [
      this.__cachedSizer,
      this.genContent(),
    ])
  },
})
