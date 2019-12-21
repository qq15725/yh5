<template>
  <div style="position: relative; min-height: 300px;">
    <div style="height: 50px;">{{ value }}</div>

    <v-draggable
      v-model="value"
    >
      <template #default="{ style }">
        <div :style="style" class="box">拖拽我</div>
      </template>
    </v-draggable>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: {
          left: 0,
          top: 50,
        }
      }
    }
  }
</script>

<style scoped>
  .box {
    height: 100px;
    width: 100px;
    border: 1px solid #DDD;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>