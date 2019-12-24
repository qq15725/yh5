<template>
  <div style="position: relative; min-height: 300px;">
    <v-draggable
      v-model="data[0]"
    >
      <template #default="{ style, value, active }">
        <div :style="style" class="box">
          <div>拖拽我</div>
          <div class="tip" v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>

    <div
      class="box box--absolute"
      :style="{ top: `${data[1].top}px`, left: `${data[1].left}px` }"
    >
      <v-draggable
        v-model="data[1]"
        @dragging="isActive = true"
        @dragstop="isActive = false"
      >
        <template #default>
          <button>拖这里</button>
        </template>
      </v-draggable>

      <div v-if="isActive" class="tip">x:{{ data[1].left }}, y:{{ data[1].top }}</div>
    </div>

    <v-draggable
      v-model="data[2]"
      axis="x"
    >
      <template #default="{ style, value, active }">
        <div :style="style" class="box">
          <div>只可横向移动</div>
          <div class="tip" v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>

    <v-draggable
      v-model="data[3]"
      axis="y"
    >
      <template #default="{ style, value, active }">
        <div :style="style" class="box">
          <div>只可纵向移动</div>
          <div class="tip" v-if="active">x:{{ value.left }}, y:{{ value.top }}</div>
        </div>
      </template>
    </v-draggable>
  </div>
</template>

<script>
  import { VDraggable } from 'yh5/src'

  export default {
    components: {
      VDraggable
    },
    data () {
      return {
        isActive: false,
        data: [
          {
            left: 0,
            top: 50,
          },
          {
            left: 120,
            top: 50,
          },
          {
            left: 0,
            top: 200,
          },
          {
            left: 120,
            top: 200,
          }
        ]
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

  .box--absolute {
    position: absolute;
  }

  .tip {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>