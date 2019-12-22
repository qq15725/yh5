import Vue from 'vue'

// Helpers
import { convertToUnit } from '../../util/helpers'

export default Vue.extend({
  name: 'measurable',

  props: {
    height: [Number, String],
    maxHeight: [Number, String],
    minHeight: [Number, String],
    width: [Number, String],
    maxWidth: [Number, String],
    minWidth: [Number, String],
  },

  computed: {
    measurableStyles () {
      const styles = {}

      const height = convertToUnit(this.height)
      const maxHeight = convertToUnit(this.maxHeight)
      const minHeight = convertToUnit(this.minHeight)
      const width = convertToUnit(this.width)
      const maxWidth = convertToUnit(this.maxWidth)
      const minWidth = convertToUnit(this.minWidth)

      if (height) styles.height = height
      if (maxHeight) styles.maxHeight = maxHeight
      if (minHeight) styles.minHeight = minHeight
      if (width) styles.width = width
      if (maxWidth) styles.maxWidth = maxWidth
      if (minWidth) styles.minWidth = minWidth

      return styles
    },
  },
})
