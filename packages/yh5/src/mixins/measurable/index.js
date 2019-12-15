import Vue from 'vue'

// Helpers
import { convertToUnit, isNumber } from '../../util/helpers'

export default Vue.extend({
  name: 'measurable',

  props: {
    position: String,
    zIndex: Number,
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
    top: [Number, String],
    left: [Number, String],
    referenceWidth: Number,
    referenceHeight: Number,
    offsetWidth: Number,
    offsetHeight: Number,
  },

  methods: {
    convertToAspectRatioUnit (value, isX = null) {
      if (isX !== null && value && isNumber(value)) {
        if (isX && this.offsetWidth && this.referenceWidth) {
          value = value * (this.offsetWidth / this.referenceWidth)
        }
        if (!isX && this.offsetHeight && this.referenceHeight) {
          value = value * (this.offsetHeight / this.referenceHeight)
        }
      }
      return convertToUnit(value)
    }
  },

  computed: {
    measurableStyles () {
      const styles = {}

      const top = this.convertToAspectRatioUnit(this.top, false)
      const height = this.convertToAspectRatioUnit(this.height, false)
      const maxHeight = this.convertToAspectRatioUnit(this.maxHeight, false)
      const minHeight = this.convertToAspectRatioUnit(this.minHeight, false)

      const left = this.convertToAspectRatioUnit(this.left, true)
      const width = this.convertToAspectRatioUnit(this.width, true)
      const maxWidth = this.convertToAspectRatioUnit(this.maxWidth, true)
      const minWidth = this.convertToAspectRatioUnit(this.minWidth, true)

      if (this.position) styles.position = this.position
      if (this.zIndex) styles.zIndex = this.zIndex
      if (height) styles.height = height
      if (minHeight) styles.minHeight = minHeight
      if (minWidth) styles.minWidth = minWidth
      if (maxHeight) styles.maxHeight = maxHeight
      if (maxWidth) styles.maxWidth = maxWidth
      if (width) styles.width = width
      if (top) styles.top = top
      if (left) styles.left = left

      return styles
    },
  },
})
