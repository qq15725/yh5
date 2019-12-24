<v-resizable-demo></v-resizable-demo>

```html
<template>
  <div style="position: relative; min-height: 300px;">
    <v-resizable
      v-model="data"
    >
      <template #default="{ style, value, active }">
        <div :style="style" class="box">调整大小</div>

        <div v-if="active">
          w:{{ value.width }},
          h:{{ value.height }}
        </div>
      </template>
    </v-resizable>
  </div>
</template>

<script>
  import { VResizable } from 'yh5'

  export default {
    components: {
      VResizable
    },
    data () {
      return {
        data: {
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
```