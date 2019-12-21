<template>
  <div style="position: relative; min-height: 300px;">
    <div style="height: 50px;">{{ value }}</div>

    <v-draggable-and-resizable
      v-model="value"
    >
      <template #default="{ style }">
        <div :style="style" class="box">拖拽、调整大小</div>
      </template>
    </v-draggable-and-resizable>
  </div>
</template>

<script>
  import { VDraggableAndResizable } from 'yh5/src'

  export default {
    components: {
      VDraggableAndResizable
    },
    data () {
      return {
        value: {
          left: 0,
          top: 50,
          width: 150,
          height: 150,
        }
      }
    }
  }
</script>

<style scoped>
  .box {
    height: 100px;
    width: 100px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>