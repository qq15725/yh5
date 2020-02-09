<template>
  <v-card
    color="#191c20"
    tile
  >
    <demo-canvas
      editable
      class="mx-auto white"
      :width="375"
      :height="667"
      max-width="100%"
      max-height="100%"
    >
      <template #item-0="{ src }">
        <img :src="src" style="display: block; width: 100%; height: 100%;"/>
      </template>
    </demo-canvas>
  </v-card>
</template>

<script>
  import DemoCanvas from '../../../assets/demo.psd'

  export default {
    components: {
      DemoCanvas
    }
  }
</script>