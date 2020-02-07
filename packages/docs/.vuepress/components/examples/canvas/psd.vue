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
    >
      <template #item-0="{ src }">
        <img :src="src" style="display: block; width: 100%; height: 100%;"/>
      </template>
    </demo-canvas>

    <div class="white--text pa-3">{{ items }}</div>
  </v-card>
</template>

<script>
  import { default as DemoCanvas, items } from '../../../assets/demo.psd'

  export default {
    components: {
      DemoCanvas
    },

    data () {
      return {
        items
      }
    }
  }
</script>