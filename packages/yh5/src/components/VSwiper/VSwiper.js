// Styles
import 'swiper/dist/css/swiper.css'

// Helpers
import mixins from '../../util/mixins'

// Components
import VCanvas from '../VCanvas'
import { swiper as VSwiper, swiperSlide as VSwiperSlide } from 'vue-awesome-swiper'

// Mixins
import Measurable from '../../mixins/measurable'

const baseMixins = mixins(
  Measurable
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-swiper',

  props: {
    value: Array,
    options: Object,
    referenceWidth: {
      type: Number,
      default: 375
    },
    referenceHeight: {
      type: Number,
      default: 667
    },
    loadedSlideIndexes: {
      type: Array,
      default: () => ([0])
    },
    disableSlideReload: Boolean
  },

  data () {
    return {
      touchStartY: 0,
      touchMoveY: 0,
      lazyIndexes: this.loadedSlideIndexes,
    }
  },

  watch: {
    loadedSlideIndexes (val) {
      this.lazyIndexes = val
    },
  },

  computed: {
    internalIndexes: {
      get () {
        return this.lazyIndexes
      },
      set (val) {
        this.lazyIndexes = val
        this.$emit('update:active-indexes', val)
      },
    },
    swiper () {
      return this.$refs.VSwiper.swiper
    }
  },

  methods: {
    touchStart (event) {
      this.touchStartY = event.clientY
    },
    touchMove (event) {
      this.touchMoveY = event.clientY
      let index
      if (this.touchMoveY - this.touchStartY > 0) {
        index = this.swiper.activeIndex - 1
      } else {
        index = this.swiper.activeIndex + 1
      }
      if (index >= 0 && index < this.value.length && this.internalIndexes.indexOf(index) === -1) {
        if (this.disableSlideReload) {
          this.internalIndexes.push(index)
        } else {
          this.internalIndexes = [
            this.swiper.activeIndex,
            index
          ]
        }
      }
    },
    slideChangeTransitionEnd () {
      if (!this.disableSlideReload) {
        this.internalIndexes = [
          this.swiper.activeIndex
        ]
      }
    },
    genContent () {
      return this.value.map(({ background, on, style, class: _class, ...attrs }, index) => {
        return this.$createElement(VSwiperSlide, {
          staticClass: 'v-swiper__slide',
        }, [
          this.$createElement(VCanvas, {
            class: _class,
            style,
            attrs,
            props: {
              referenceWidth: this.referenceWidth,
              referenceHeight: this.referenceHeight,
              background,
              hideElements: this.internalIndexes.indexOf(index) === -1,
            },
            on,
          })
        ])
      })
    }
  },

  render (h) {
    const options = this.options || {}

    options.on = {
      touchStart: this.touchStart,
      touchMove: this.touchMove,
      slideChangeTransitionEnd: this.slideChangeTransitionEnd,
      ...(options.on || {}),
    }

    return h(VSwiper, {
      ref: 'VSwiper',
      staticClass: 'v-swiper',
      style: this.measurableStyles,
      props: {
        options,
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    }, [
      this.genContent(),
      this.$slots.default
    ])
  }
})