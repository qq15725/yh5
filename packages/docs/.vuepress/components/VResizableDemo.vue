<template>
  <div style="position: relative; min-height: 300px;">
    <div style="height: 50px;">{{ value }}</div>

    <v-resizable
      v-model="value"
    >
      <template #default="{ style }">
        <div :style="style" class="box">调整大小</div>
      </template>
    </v-resizable>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: {
          width: 100,
          height: 100,
        }
      }
    }
  }
</script>

<style scoped>
  .box {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>