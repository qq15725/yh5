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

      return styles
    },
  },
})
