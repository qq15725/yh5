import Vue from 'vue'

// Helpers
import { convertToUnit } from '../../util/helpers'

export default Vue.extend({
  name: 'animationable',

  props: {
    animationDuration: Number,
    animationDelay: Number,
    animationIterationCount: String,
  },

  computed: {
    animationableStyles () {
      const styles = {}

      const animationDuration = convertToUnit(this.animationDuration, 's')
      const animationDelay = convertToUnit(this.animationDelay, 's')

      if (animationDuration) styles.animationDuration = animationDuration
      if (animationDelay) styles.animationDelay = animationDelay
      if (this.animationIterationCount) styles.animationIterationCount = this.animationIterationCount

      return styles
    },
  },
})
