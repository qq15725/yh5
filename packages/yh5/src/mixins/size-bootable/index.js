import Vue from 'vue'

export default Vue.extend({
  name: 'size-bootable',

  methods: {
    sizeBoot () {
      this.$nextTick(() => {
        this.$emit('size-booted', {
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight,
        })
      })
    },
  },
})
