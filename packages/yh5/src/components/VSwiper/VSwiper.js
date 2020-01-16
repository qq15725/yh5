import './VSwiper.scss'
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
    disableSlideReload: Boolean,
    lazy: Boolean,
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
    },
    isLoop () {
      return this.options.loop
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
        index = this.swiper.realIndex - 1
      } else {
        index = this.swiper.realIndex + 1
      }
      if (index >= 0 && index < this.value.length && this.internalIndexes.indexOf(index) === -1) {
        if (this.disableSlideReload) {
          this.internalIndexes.push(index)
        } else {
          this.internalIndexes = [
            this.swiper.realIndex,
            index
          ]
        }
      }
    },
    slideChangeTransitionEnd () {
      if (!this.disableSlideReload && this.swiper) {
        this.internalIndexes = [
          this.swiper.realIndex
        ]
      }
    },
    genContent () {
      return this.value.map(({ background, on, style, class: _class, ...attrs }, index) => {
        return this.$createElement(VSwiperSlide, [
          this.$createElement(VCanvas, {
            class: _class,
            style,
            attrs,
            props: {
              appear: true,
              absolute: true,
              referenceWidth: this.referenceWidth,
              referenceHeight: this.referenceHeight,
              background,
              lazy: this.lazy,
              hideElements: !this.lazy && !this.isLoop && this.internalIndexes.indexOf(index) === -1,
            },
            on,
          })
        ])
      })
    }
  },

  render (h) {
    const options = Object.assign({
      wrapperClass: 'v-swiper__wrapper',
      slideClass: 'v-swiper__slide',
      slideActiveClass: 'v-swiper__slide--active',
      slideNextClass: 'v-swiper__slide--next',
      slidePrevClass: 'v-swiper__slide--prev',
      slideDuplicateClass: 'v-swiper__slide--duplicate',
      slideVisibleClass: 'v-swiper__slide--visible',
      slideDuplicatedActiveClass: 'v-swiper__slide--duplicate-active',
      slideDuplicatedNextClass: 'v-swiper__slide--duplicate-next',
      slideDuplicatedPrevClass: 'v-swiper__slide--duplicate-prev',
      containerModifierClass: 'v-swiper--',
    }, this.options || {})

    options.on = {
      touchStart: this.touchStart,
      touchMove: this.touchMove,
      slideChangeTransitionEnd: this.slideChangeTransitionEnd,
      ...(options.on || {}),
    }

    let staticClass = 'v-swiper'

    if (this.isLoop) {
      staticClass += ' v-swiper--loop'
    }

    return h(VSwiper, {
      ref: 'VSwiper',
      staticClass,
      style: this.measurableStyles,
      props: {
        options,
      },
      on: this.$listeners,
      scopedSlots: {
        pagination: this.$scopedSlots.pagination,
      },
    }, [
      this.genContent(),
      this.$slots.default
    ])
  }
})