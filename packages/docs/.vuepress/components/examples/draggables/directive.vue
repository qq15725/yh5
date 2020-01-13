<template>
  <v-card
    tile
    dark
    width="100"
    height="100"
    style="position: absolute; cursor: move;"
    :style="{ top: `${value.top}px`, left: `${value.left}px` }"
    v-draggable="{ start: onStart, move: onMove, end: onEnd }"
  >
  </v-card>
</template>

<script>
  import { Draggable } from 'yh5/lib/directives'

  export default {
    directives: {
      Draggable
    },
    data () {
      return {
        value: {
          top: 0,
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