<template>
  <div style="position: relative; min-height: 300px;">
    <div style="height: 50px;">{{ value }}</div>

    <div
      class="drag-me"
      :style="{ top: `${value.top}px`, left: `${value.left}px` }"
      v-draggable="{ start: onStart, move: onMove, end: onEnd }"
    >
      拖拽我
    </div>
  </div>
</template>

<script>
  import { Draggable } from 'yh5/src'

  export default {
    directives: {
      Draggable
    },
    data () {
      return {
        value: {
          top: 50,
          left: 0,
        },
        originalValue: null
      }
    },
    methods: {
      onStart () {
        this.originalValue = Object.assign({}, this.value)
      },
      onMove (event) {
        if (!this.originalValue) return

        this.value = {
          left: this.originalValue.left + event.dragOffsetX,
          top: this.originalValue.top + event.dragOffsetY,
        }
      },
      onEnd () {
        this.originalValue = null
      },
    }
  }
</script>

<style scoped>
  .drag-me {
    position: absolute;
    height: 100px;
    width: 100px;
    border: 1px solid #DDD;
    background-color: white;
    text-align: center;
    line-height: 100px;
    cursor: move;
  }
</style>