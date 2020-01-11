<p align="center">
  <a href="https://qq15725.github.io/yh5/" target="_blank">
      <img alt="Yh5 Logo" width="200" src="./logo.svg">
  </a>
</p>

<p>
  <a href="https://www.npmjs.com/package/yh5" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/yh5.svg">
  </a>
  <a href="https://qq15725.github.io/yh5/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/qq15725/yh5/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/qq15725/yh5/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

### 简介

快速搭建中后台(hpaPaaS平台)数据驱动、可视化编辑的常用组件库

### Webpack 使用

1. 安装:

```bash
npm install --save yh5
```

2. 添加至你的vue应用:

```javascript
import Vue from 'vue'
import Yh5 from 'yh5'

Vue.use(Yh5)
```

### CDN 使用

简单使用

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/yh5/dist/yh5.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/yh5/dist/yh5.min.js"></script>

  <!-- v-swiper 依赖 vue-awesome-swiper -->

  <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/css/swiper.min.css" rel="stylesheet">-->
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/js/swiper.min.js"></script>-->
  <!--<script src="https://cdn.jsdelivr.net/npm/vue-awesome-swiper@3.1.2/dist/vue-awesome-swiper.js"></script>-->
</head>

<body>
<div id="app">
  <v-canvas
    height="100vh"
    width="100vw"
    v-model="data"
    editable
    absolute
  >
  </v-canvas>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      data: [
        {
          tag: 'img',
          src: 'https://picsum.photos/id/11/500/300',
          width: 300,
          height: 300,
        }
      ]
    },
  })
</script>
</body>

</html>
```

### 文档

https://qq15725.github.io/yh5/

### 参考

- [云凤蝶如何打造媲美 sketch 的自由画布](https://zhuanlan.zhihu.com/p/92469406)
- [云凤蝶自由画布之道：分层模型](https://zhuanlan.zhihu.com/p/97768853)
- [Vuetify（代码风格）](https://github.com/vuetifyjs/vuetify)