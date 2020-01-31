<template>
  <v-card
    color="#191c20"
    tile
  >
    <v-canvas
      editable
      parent
      absolute
      class="mx-auto white"
      v-bind="canvas"
      @input="val => canvas.value = val"
    >
    </v-canvas>
  </v-card>
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