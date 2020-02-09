# 快速开始

## Webpack 安装

要将 Yh5 安装到 Webpack 项目，您需要添加几个依赖：

```bash
npm install yh5
```

```bash
npm install sass sass-loader fibers deepmerge -D
```

请找到你的 webpack.config.js 文件，并将下面的片段复制到 rules 。

```javascript
// webpack.config.js

module.exports = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
}
```

添加至你的vue应用:

```javascript
import Vue from 'vue'
import Yh5 from 'yh5/lib'
import * as components from 'yh5/lib/components'

Vue.use(Yh5, {
  components
})
```

## 使用 CDN

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

