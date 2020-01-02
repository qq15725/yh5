### 使用

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/resizables/usage.vue">
<examples-resizables-usage></examples-resizables-usage>

<div slot="template">

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

<style scoped>
  .box {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```  
  
</div>

<div slot="script">

```html
<script>
  export default {
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
```  

</div>
</v-code-card>