import Vue from 'vue'

const TRANSITION_LISTENERS = [
  'before-appear', 'appear', 'after-appear', 'appear-cancelled',
  'before-enter', 'enter', 'after-enter', 'enter-cancelled',
  'before-leave', 'leave', 'after-leave', 'leave-cancelled',
]

export default Vue.extend({
  name: 'transitionable',

  props: {
    appear: Boolean,
    css: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: [String, Boolean],
      default: false,
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
      let on = null
      Object.keys(this.$listeners).forEach(key => {
        if (TRANSITION_LISTENERS.includes(key)) {
          on = on || {}
          on[key] = this.$listeners[key]
        }
      })

      if (this.transition || on) {
        const props = {
          appear: this.appear,
          css: this.css,
        }

        if (this.transition) props.name = this.transition
        if (this.type) props.type = this.type
        if (this.mode) props.mode = this.mode
        if (this.duration) props.duration = this.duration
        if (this.enterClass) props.enterClass = this.enterClass
        if (this.leaveClass) props.leaveClass = this.leaveClass
        if (this.appearClass) props.appearClass = this.appearClass
        if (this.enterToClass) props.enterToClass = this.enterToClass
        if (this.leaveToClass) props.leaveToClass = this.leaveToClass
        if (this.appearToClass) props.appearToClass = this.appearToClass
        if (this.enterActiveClass) props.enterActiveClass = this.enterActiveClass
        if (this.leaveActiveClass) props.leaveActiveClass = this.leaveActiveClass
        if (this.appearActiveClass) props.appearActiveClass = this.appearActiveClass

        item = this.$createElement('transition', {
          props,
          on
        }, [item])
      }
      return item
    }
  }
})
