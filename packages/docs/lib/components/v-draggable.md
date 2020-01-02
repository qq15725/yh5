### 使用

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/draggables/usage.vue">
<examples-draggables-usage></examples-draggables-usage>

<div slot="template">

```html
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
```  
  
</div>
</v-code-card>

### 指定拖拽部分

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/draggables/handle.vue">
<examples-draggables-handle></examples-draggables-handle>

<div slot="template">

```html
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
```  
  
</div>

<div slot="script">

```html
<script>
  export default {
    data () {
      return {
        data: { left: 0, top: 50 }
      }
    }
  }
</script>
```  

</div>
</v-code-card>

### 指定xy轴拖动 

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/draggables/axis.vue">
<examples-draggables-axis></examples-draggables-axis>

<div slot="template">

```html
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
```  
  
</div>

<div slot="script">

```html
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
```  

</div>
</v-code-card>