// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

export default RegistrableInject('sketch').extend({
  name: 'sketch-item',

  props: {
    height: [Number, String],
    width: [Number, String],
    top: [Number, String],
    left: [Number, String],
    disabled: Boolean,
  },

  created () {
    !this.disabled && this.sketch && this.sketch.register(this)
  },

  beforeDestroy () {
    !this.disabled && this.sketch && this.sketch.unregister(this)
  },

  computed: {
    refLines () {
      return {
        vt: Number(this.top),
        vm: Number(this.top) + Number(this.height) / 2,
        vb: Number(this.top) + Number(this.height),
        hl: Number(this.left),
        hm: Number(this.left) + Number(this.width) / 2,
        hr: Number(this.left) + Number(this.width),
      }
    },
  },
})

