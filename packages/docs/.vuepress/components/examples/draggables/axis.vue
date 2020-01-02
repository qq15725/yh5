<template>
  <div style="min-height: 300px; position: relative;">
    <v-draggable
      parent
      axis="x"
      v-model="xAxis"
    >
      <template #default="{ style, value, active }">
        <div style="width: 100px; height: 100px; border: 1px solid #DDD;" :style="style">
          <div>横向</div>
          <div v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>

    <v-draggable
      parent
      axis="y"
      v-model="yAxis"
    >
      <template #default="{ style, value, active }">
        <div style="width: 100px; height: 100px; border: 1px solid #DDD;" :style="style">
          <div>纵向</div>
          <div v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        xAxis: {
          left: 50,
          top: 50,
        },
        yAxis: {
          left: 250,
          top: 50,
        }
      }
    }
  }
</script>