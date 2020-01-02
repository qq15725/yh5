<template>
  <div
    style="min-height: 300px; position: relative;"
    id="draggable-parent"
  >
    <div
      style="width: 100px; height: 100px; border: 1px solid #DDD; position: absolute;"
      :style="{ top: `${data.top}px`, left: `${data.left}px` }"
    >
      <v-draggable
        v-model="data"
        @dragging="isActive = true"
        @dragstop="isActive = false"
        parent="#draggable-parent"
      >
        <template #default>
          <v-btn small color="primary">拖这里</v-btn>
        </template>
      </v-draggable>

      <div v-if="isActive">x:{{ data.left }}, y:{{ data.top }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: {
          top: 0,
          left: 0,
        },
        isActive: false,
      }
    }
  }
</script>