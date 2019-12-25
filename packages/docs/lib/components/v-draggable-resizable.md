<v-draggable-resizable-demo></v-draggable-resizable-demo>

```html
<template>
  <div
    class="container"
  >
    <div class="grid">
      <v-draggable-resizable
        v-model="data"
        :grid="20"
        :min-width="30"
        :min-height="30"
        :max-width="200"
        :max-height="200"
        parent
        :aspect-ratio="1"
      >
        <template #default="{ style, value, active }">
          <div :style="style" class="box">拖拽、调整大小</div>

          <div v-if="active">
            x:{{ value.left }},
            y:{{ value.top }},
            w:{{ value.width }},
            h:{{ value.height }}
          </div>
        </template>
        <template #tl>😀</template>
        <template #t>😂</template>
        <template #tr>😆</template>
        <template #r>😉</template>
        <template #br>😎</template>
        <template #b>😍</template>
        <template #bl>😣</template>
        <template #l>😕</template>
      </v-draggable-resizable>
    </div>
  </div>
</template>

<script>
  import { VDraggableResizable } from 'yh5'

  export default {
    components: {
      VDraggableResizable
    },
    data () {
      return {
        data: {
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
  .container {
    position: relative;
  }

  .grid {
    position: relative;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
    min-height: 300px;
  }

  .box {
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```