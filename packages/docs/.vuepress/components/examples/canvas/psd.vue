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
      :width="375"
      :height="667"
      :reference-width="canvasWidth"
      :reference-height="canvasHeight"
      :value="data"
    >
    </v-canvas>
  </v-card>
</template>

<script>
  import canvas from '../../../assets/demo.psd'

  export default {
    data () {
      return {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        data: canvas.children
      }
    }
  }
</script>