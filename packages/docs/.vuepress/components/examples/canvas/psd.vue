<template>
  <v-canvas
    editable
    parent
    absolute
    v-bind="canvas"
    @input="val => canvas.value = val"
  >
  </v-canvas>
</template>

<script>
  import canvas from '../../../assets/demo.psd'

  export default {
    data () {
      return {
        canvas
      }
    }
  }
</script>