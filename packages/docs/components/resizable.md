## 可调整大小的

`v-resizable` 组件实际上是继承了 `v-draggable` 组件，并将拖拽能力赋予给了8个控制点。

## 用例

试试拖动下方小方块的边调整其大小。

<v-code-card url="/components/examples/resizables/usage.vue">

<examples-resizables-usage></examples-resizables-usage>

<div slot="template">

```html
<template>
  <v-card flat tile>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="grid" label="grid" class="mx-2"></v-switch>
      <v-switch v-model="disabled" label="disabled" class="mx-2"></v-switch>
      <v-switch v-model="outlined" label="outlined" class="mx-2"></v-switch>
      <v-switch v-model="point" label="point" class="mx-2"></v-switch>
      <v-select v-model="handles" style="max-width: 250px;" label="handles" :items="['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']" outlined dense class="mt-4 mx-2" attach multiple></v-select>
    </v-row>

    <v-divider></v-divider>

    <v-card
      min-height="300"
      flat
      tile
      :style="{ background: grid ? 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px' : '' }"
    >
      <v-resizable
        v-model="data"
        :parent="parent"
        :grid="grid ? [20, 20] : undefined"
        :disabled="disabled"
        :outlined="outlined"
        :point="point"
        :handles="handles"
      >
        <template #default="{ style }">
          <v-card
            :style="style"
            dark
            tile
          >
          </v-card>
        </template>
      </v-resizable>
    </v-card>
  </v-card>
</template>

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
        },
        parent: false,
        disabled: false,
        grid: false,
        outlined: false,
        point: false,
        handles: ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br'],
      }
    },
  }
</script>
```  

</div>

</v-code-card>

## 示例

### 使用插槽

<v-code-card min-height="300" url="/components/examples/resizables/slots.vue">

<examples-resizables-slots></examples-resizables-slots>

<div slot="template">

```html
<template>
  <v-resizable :value="{ width: 100, height: 100 }">
    <template #default="{ style }">
      <v-card :style="style" dark tile></v-card>
    </template>
    <template #tl="{ on, style }">
      <div v-on="on" :style="style">😀</div>
    </template>
    <template #t="{ on, style }">
      <div v-on="on" :style="style">😂</div>
    </template>
    <template #tr="{ on, style }">
      <div v-on="on" :style="style">😆</div>
    </template>
    <template #r="{ on, style }">
      <div v-on="on" :style="style">😉</div>
    </template>
    <template #br="{ on, style }">
      <div v-on="on" :style="style">😎</div>
    </template>
    <template #b="{ on, style }">
      <div v-on="on" :style="style">😍</div>
    </template>
    <template #bl="{ on, style }">
      <div v-on="on" :style="style">😣</div>
    </template>
    <template #l="{ on, style }">
      <div v-on="on" :style="style">😕</div>
    </template>
  </v-resizable>
</template>
```  
  
</div>

</v-code-card>