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
      <v-switch v-model="appear" label="appear" class="mx-2"></v-switch>
    </v-row>

    <v-row no-gutters class="pa-2">
      <v-btn color="primary" small @click.stop="onAdd">添加input</v-btn>
    </v-row>

    <v-card
      class="pa-md-10"
      color="#191c20"
      tile
    >
      <v-canvas
        v-model="data"
        :width="375"
        :height="667"
        max-width="100%"
        max-height="100%"
        :editable="editable"
        :parent="parent"
        absolute
        class="mx-auto white"
      >
      </v-canvas>
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
        parent: false,
        editable: true,
        appear: false,
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
    }
  }
</script>
```  

</div>
</v-code-card>

## Props

| 参数 | 类型 | 默认值 |
| ---- | ---- | ---- |
| width | number/string | - |
| height | number/string | - |
| editable | boolean | - |
| lazy | boolean | - |
| lazy-once | boolean | - |
| absolute | boolean | - |
| fixed | boolean | - |
| parent | boolean | - |
| background | string | - |
| background-position | string | center center |
| background-size | string | 100% 100% |
| value | array | - |

## Slots

| name | 说明 |
| ---- | ---- |
| item-${index} | - |
| ${item.name} | - |

## 示例

### 通过PSD文件渲染画布

借助 [yh5-loader](/loader/) 解析PSD文件渲染画布

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
      max-width="100%"
      max-height="100%"
    >
      <template #item-0="{ src }">
        <img :src="src" style="display: block; width: 100%; height: 100%;"/>
      </template>
    </demo-canvas>
  </v-card>
</template>
```  
  
</div>

<div slot="script">

```html
<script>
  import DemoCanvas from '../../../assets/demo.psd'

  export default {
    components: {
      DemoCanvas
    }
  }
</script>
```  

</div>
</v-code-card>