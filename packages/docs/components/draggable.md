## 可拖拽的

`v-draggable` 组件是一个基础组件，只单纯赋予拖拽能力。

## 用例

试试拖动下方小方块

<v-code-card url="/components/examples/draggables/usage.vue">

<examples-draggables-usage></examples-draggables-usage>

<div slot="template">

```html
<template>
  <v-card flat tile>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="cursor" label="cursor" class="mx-2"></v-switch>
      <v-switch v-model="grid" label="grid" class="mx-2"></v-switch>
      <v-switch v-model="disabled" label="disabled" class="mx-2"></v-switch>
      <v-select v-model="position" style="max-width: 150px;" label="position" :items="['normal', 'absolute', 'fixed']" outlined dense class="mt-4 mx-2"></v-select>
      <v-select v-model="axis" style="max-width: 150px;" label="axis" :items="['both', 'x', 'y']" outlined dense class="mt-4 mx-2"></v-select>
    </v-row>

    <v-divider></v-divider>

    <v-card
      min-height="300"
      flat
      tile
      :style="{ background: grid ? 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px' : '' }"
    >
      <v-draggable
        :parent="parent"
        :[position]="true"
        :cursor="cursor"
        :grid="grid ? [20, 20] : undefined"
        :axis="axis"
        :disabled="disabled"
      >
        <template #default="{ style, on }">
          <v-card
            v-on="on"
            :style="style"
            tile
            dark
            width="100"
            height="100"
            style="z-index: 10;"
          >
          </v-card>
        </template>
      </v-draggable>
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
        parent: false,
        cursor: false,
        disabled: false,
        grid: false,
        position: 'normal',
        axis: 'both',
      }
    },
  }
</script>
```  

</div>

</v-code-card>

## 示例

### 指定拖拽部分

尝试拖动这个应用窗口的顶部工具栏。

<v-code-card height="300" url="/components/examples/draggables/handle.vue">

<examples-draggables-handle></examples-draggables-handle>

<div slot="template">

```html
<template>
  <v-draggable parent absolute>
    <template #default="{ style, on }">
      <v-card :style="style" tile width="250" height="150" outlined>
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
  </v-draggable>
</template>
```
  
</div>

</v-code-card>

### 只允许x轴或y轴拖动

尝试拖拽导航右侧边缘

<v-code-card height="300" url="/components/examples/draggables/axis.vue">
<examples-draggables-axis></examples-draggables-axis>

<div slot="template">

```html
<template>
  <v-draggable axis="x" :value="{ left: 150 }">
    <template #default="{ on, value: { left } }">
      <v-navigation-drawer
        dark
        :width="Math.max(150, left)"
        style="transition: none;"
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/71.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-text="'image'"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Photos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider
          v-on="on"
          style="position: absolute; top: 0; right: -5px; width: 10px; max-width: 10px; cursor: ew-resize;"
          vertical
          color="primary"
        >
        </v-divider>
      </v-navigation-drawer>
    </template>
  </v-draggable>
</template>
```  
  
</div>

</v-code-card>