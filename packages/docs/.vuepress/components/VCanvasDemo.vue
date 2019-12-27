<template>
  <div
    @click="onClick"
  >
    <button @click.stop="onAdd">添加按钮</button>

    <v-canvas
      v-model="data"
      :selected-index.sync="selectedIndex"
      :height="500"
      editable
    >
    </v-canvas>
  </div>
</template>

<script>
  import { VCanvas, VElement } from 'yh5/src'

  export default {
    components: {
      VCanvas,
      VElement
    },

    data () {
      return {
        selectedIndex: null,
        data: [
          {
            tag: 'button',
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            style: {
              outline: 'none'
            },
            children: '按钮1',
          },
          {
            tag: 'button',
            top: 50,
            left: 50,
            width: 50,
            height: 50,
            style: {
              outline: 'none'
            },
            children: '按钮2',
          }
        ]
      }
    },

    methods: {
      onAdd () {
        this.data.push({
          tag: 'button',
          children: '按钮' + this.data.length,
          top: length * 10,
          left: length * 10,
          width: 80,
          height: 80,
          style: {
            outline: 'none'
          },
        })
      },
      onClick () {
        this.selectedIndex = null
      }
    }
  }
</script>