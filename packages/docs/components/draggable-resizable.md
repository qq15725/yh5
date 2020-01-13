## 可拖拽调整大小的

`v-draggable-resizable` 组件是组合了 `v-draggable` 和 `v-resizable` 两个组件的能力。

## 用例

试试拖动下方小方块的边调整其大小，拖动中间调整其位置。

<v-code-card url="/components/examples/draggable-resizable/usage.vue">

<examples-draggable-resizable-usage></examples-draggable-resizable-usage>

<div slot="template">

```html
<template>
  <v-card flat tile>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="cursor" label="cursor" class="mx-2"></v-switch>
      <v-switch v-model="grid" label="grid" class="mx-2"></v-switch>
      <v-switch v-model="disabled" label="disabled" class="mx-2"></v-switch>
      <v-switch v-model="outlined" label="outlined" class="mx-2"></v-switch>
      <v-switch v-model="point" label="point" class="mx-2"></v-switch>
      <v-select v-model="position" style="max-width: 150px;" label="position" :items="['normal', 'absolute', 'fixed']" outlined dense class="mt-4 mx-2"></v-select>
      <v-select v-model="axis" style="max-width: 150px;" label="axis" :items="['both', 'x', 'y']" outlined dense class="mt-4 mx-2"></v-select>
      <v-select v-model="handles" style="max-width: 250px;" label="handles" :items="['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']" outlined dense class="mt-4 mx-2" attach multiple></v-select>
      <v-switch v-model="draggable" label="draggable" class="mx-2"></v-switch>
      <v-switch v-model="resizable" label="resizable" class="mx-2"></v-switch>
    </v-row>

    <v-divider></v-divider>

    <v-card
      min-height="300"
      flat
      tile
      :style="{ background: grid ? 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px' : '' }"
    >
      <v-draggable-resizable
        v-model="data"
        :parent="parent"
        :[position]="true"
        :cursor="cursor"
        :grid="grid ? [20, 20] : undefined"
        :axis="axis"
        :disabled="disabled"
        :outlined="outlined"
        :point="point"
        :handles="handles"
        :draggable="draggable"
        :resizable="resizable"
        style="z-index: 10;"
      >
        <template #default="{ style, on }">
          <v-card
            v-on="on"
            :style="style"
            dark
            tile
          >
          </v-card>
        </template>
      </v-draggable-resizable>
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
          left: 0,
          top: 0,
          width: 100,
          height: 100,
        },
        parent: false,
        cursor: false,
        disabled: false,
        outlined: false,
        point: false,
        grid: false,
        position: 'normal',
        axis: 'both',
        handles: ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br'],
        draggable: true,
        resizable: true,
      }
    }
  }
</script>
```  

</div>
</v-code-card>

## 示例

### 一个完整的应用窗口例子

尝试拖动这个应用窗口的顶部工具栏移动位置，拖动边调整大小。

<v-code-card height="300" url="/components/examples/draggable-resizable/panel.vue">

<examples-draggable-resizable-panel></examples-draggable-resizable-panel>

<div slot="template">

```html
<template>
  <v-draggable-resizable
    :value="{ width: 200, height: 100, left: 0, top: 0 }"
    parent
    absolute
    min-width="150"
    min-height="100"
  >
    <template #default="{ style, on }">
      <v-card :style="style" tile outlined>
        <v-system-bar style="cursor: move;" v-on="on" window dark>
          <v-icon v-text="'message'"></v-icon>
          <div class="text-truncate">10封未读邮件</div>
          <v-spacer></v-spacer>
          <v-icon v-text="'remove'"></v-icon>
          <v-icon v-text="'check_box_outline_blank'"></v-icon>
          <v-icon v-text="'close'"></v-icon>
        </v-system-bar>
      </v-card>
    </template>
  </v-draggable-resizable>
</template>
```  
  
</div>

</v-code-card>