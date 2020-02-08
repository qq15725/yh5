import Vue from 'vue'

// Helpers
import { convertToUnit } from '../../util/helpers'

export default Vue.extend({
  name: 'positionable',

  props: {
    absolute: Boolean,
    fixed: Boolean,
    top: [Number, String],
    left: [Number, String],
    right: [Number, String],
    bottom: [Number, String],
    zIndex: Number,
  },

  computed: {
    positionableStyles () {
      const styles = {}

      const top = convertToUnit(this.top)
      const left = convertToUnit(this.left)
      const right = convertToUnit(this.right)
      const bottom = convertToUnit(this.bottom)

      if (top) styles.top = top
      if (left) styles.left = left
      if (right) styles.right = right
      if (bottom) styles.bottom = bottom
      if (this.zIndex) styles.zIndex = this.zIndex

      return styles
    },
    positionableClasses () {
      return {
        'v-position--absolute': this.absolute,
        'v-position--fixed': this.fixed,
      }
    }
  },
})
