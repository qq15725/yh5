<template>
  <div style="min-height: 300px; position: relative;">
    <v-draggable parent>
      <template #default="{ style, value, active }">
        <div style="width: 100px; height: 100px; border: 1px solid #DDD;" :style="style">
          <div>拖拽我</div>
          <div v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>
  </div>
</template>