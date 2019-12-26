<template>
  <div
    @click="onClick"
  >
    <v-canvas
      v-model="data"
      :selected-index.sync="selectedIndex"
      :height="500"
      editable
    >
    </v-canvas>
    {{ data }}
  </div>
</template>

<script>
  import { VCanvas } from 'yh5/src'

  export default {
    components: {
      VCanvas
    },

    data () {
      return {
        selectedIndex: null,
        data: [
          {
            tag: 'div',
            children: '按钮1',
          },
          {
            tag: 'div',
            children: '按钮2',
          },
        ]
      }
    },

    methods: {
      onClick () {
        this.selectedIndex = null
      }
    }
  }
</script>