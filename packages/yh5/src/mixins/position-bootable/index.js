import Vue from 'vue'

export default Vue.extend({
  name: 'position-bootable',

  methods: {
    positionBoot () {
      this.$nextTick(() => {
        this.$emit('position-booted', {
          top: this.$el.offsetTop,
          left: this.$el.offsetLeft,
        })
      })
    },
  },
})
