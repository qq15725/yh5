import Vue from 'vue'

export default Vue.extend({
  name: 'transitionable',

  props: {
    appear: Boolean,
    css: {
      type: Boolean,
      default: true
    },
    transition: {
      type: [String, Boolean],
      default: false
    },
    type: String,
    mode: String,
    duration: [Number, Object],
    enterClass: String,
    leaveClass: String,
    appearClass: String,
    enterToClass: String,
    leaveToClass: String,
    appearToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearActiveClass: String,
  },

  methods: {
    genTransition (item) {
      if (this.transition) {
        const props = {
          name: this.transition,
          appear: this.appear,
          css: this.css,
          type: this.type,
          mode: this.mode,
          duration: this.duration
        }

        if (this.enterClass) props.enterClass = this.enterClass
        if (this.leaveClass) props.leaveClass = this.leaveClass
        if (this.appearClass) props.appearClass = this.appearClass
        if (this.enterToClass) props.enterToClass = this.enterToClass
        if (this.leaveToClass) props.leaveToClass = this.leaveToClass
        if (this.appearToClass) props.appearToClass = this.appearToClass
        if (this.enterActiveClass) props.enterActiveClass = this.enterActiveClass
        if (this.leaveActiveClass) props.leaveActiveClass = this.leaveActiveClass
        if (this.appearActiveClass) props.appearActiveClass = this.appearActiveClass

        item = this.$createElement('transition', { props }, [item])
      }
      return item
    }
  }
})
