import 'swiper/dist/css/swiper.css'

import { swiper as VSwiper, swiperSlide as VSwiperSlide } from 'vue-awesome-swiper'

// Helpers
import mixins from '../../util/mixins'

// Components
import VCanvas from '../VCanvas'

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
  },

  data () {
    return {
      activeIndex: 0,
      activatedIndexs: [0],
      touchStartY: 0,
      touchMoveY: 0,
    }
  },

  computed: {
    swiper () {
      return this.$refs.theSwiper.swiper
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
        index = this.activeIndex - 1
      } else {
        index = this.activeIndex + 1
      }
      if (index >= 0
        && index < this.value.length
        && this.activatedIndexs.indexOf(index) === -1) {
        this.activatedIndexs.push(index)
      }
    },
    slideChange () {
      this.activeIndex = this.swiper.activeIndex
      if (this.activatedIndexs.indexOf(this.activeIndex) === -1) {
        this.activatedIndexs.push(this.activeIndex)
      }
    }
  },

  render (h) {
    const options = this.options || {}

    options.on = {
      touchStart: this.touchStart,
      touchMove: this.touchMove,
      slideChange: this.slideChange,
      ...(options.on || {})
    }

    return this.$createElement(VSwiper, {
      ref: 'theSwiper',
      staticClass: 'v-swiper',
      style: this.measurableStyles,
      props: {
        options
      }
    }, [
      this.value.map(({ ...attrs }, index) => {
        return h(VSwiperSlide, {
          staticClass: 'v-swiper__slide',
        }, [
          this.activatedIndexs.indexOf(index) > -1 && h(VCanvas, {
            attrs,
            props: {
              referenceWidth: this.referenceWidth,
              referenceHeight: this.referenceHeight,
            }
          })
        ])
      })
    ])
  }
})