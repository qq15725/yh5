## 画布

`v-canvas` 组件赋予你使用JSON编排组件的能力。

## 用例

<v-code-card url="/components/examples/canvas/usage.vue">

<examples-canvas-usage></examples-canvas-usage>

<div slot="template">

```html
<template>
  <div>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="editable" label="editable" class="mx-2"></v-switch>
      <v-switch v-model="resizable" label="resizable" class="mx-2"></v-switch>
      <v-switch v-model="appear" label="appear" class="mx-2"></v-switch>
    </v-row>

    <v-row no-gutters class="pa-2">
      <v-btn color="primary" small @click.stop="onAdd">添加input</v-btn>
    </v-row>

    <v-card
      class="pa-10"
      color="#191c20"
      tile
    >
      <div
        @click="onClick"
      >
        <v-canvas
          v-model="data"
          :selected-index.sync="selectedIndex"
          :width="size.width"
          :height="size.height"
          @size-change="val => size = val"
          :editable="editable"
          :resizable="resizable"
          :parent="parent"
          absolute
          class="mx-auto white"
        >
        </v-canvas>
      </div>
    </v-card>
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
        size: {
          width: 375,
          height: 667,
        },
        parent: false,
        editable: true,
        resizable: true,
        appear: false,
        selectedIndex: null,
        data: [
          {
            tag: 'v-card',
            top: 50,
            left: 50,
            width: 300,
            height: 100,
            ripple: false,
            children: [
              {
                tag: 'v-sparkline',
                padding: 24,
                color: 'rgba(0, 0, 0, .7)',
                strokeLinecap: 'round',
                smooth: true,
                value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
                autoDraw: true,
              }
            ]
          },
          {
            tag: 'v-text-field',
            top: 180,
            left: 100,
            outlined: true,
            hideDetails: true,
            placeholder: '请输入详细信息',
          },
          {
            tag: 'v-btn',
            color: '#137ae3',
            small: true,
            dark: true,
            top: 250,
            left: 50,
            children: '按钮2',
          }
        ]
      }
    },

    methods: {
      onAdd () {
        this.data.push({
          tag: 'v-text-field',
          top: 0,
          left: 100,
          outlined: true,
          hideDetails: true,
          placeholder: '请输入详细信息',
        })
      },
      onClick () {
        this.selectedIndex = null
      }
    }
  }
</script>
```  

</div>
</v-code-card>

## 示例

### 通过PSD文件渲染画布

借助 yh5-loader 解析PSD文件渲染画布

```bash
npm install --save-dev yh5-loader
```

```javascript
config.module.rule('psd')
             .test(/\.psd$/)
             .use('yh5-loader')
             .loader(require.resolve('yh5-loader'))
```

<v-code-card url="/components/examples/canvas/psd.vue">

<examples-canvas-psd></examples-canvas-psd>

<div slot="template">

```html
<template>
  <v-card
    color="#191c20"
    tile
  >
    <demo-canvas
      editable
      class="mx-auto white"
      :width="375"
      :height="667"
    >
      <template #item-0="{ src }">
        <img :src="src" style="display: block; width: 100%; height: 100%;"/>
      </template>
    </demo-canvas>

    <div class="white--text pa-3">{{ items }}</div>
  </v-card>
</template>
```  
  
</div>

<div slot="script">

```html
<script>
  import { default as DemoCanvas, items } from '../../../assets/demo.psd'

  export default {
    components: {
      DemoCanvas
    },

    data () {
      return {
        items
      }
    }
  }
</script>
```  

</div>
</v-code-card>