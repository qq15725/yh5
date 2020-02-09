# 浏览器支持

## 支持 IE11 和 Safari 9

Yh5 利用了 ES2015/2017 的一些特性，要使用 polyfills 进行处理。如果您正在使用 Vue CLI，那么将会自动为你解决。否则，在你的项目目录中，你可以安装 babel-polyfill：

```bash
npm install babel-polyfill --save
```

入口文件中引用

```javascript
// src/main.js

import 'babel-polyfill'
import Vue from 'vue'
import Yh5 from 'yh5/lib'
import * as components from 'yh5/lib/components'

Vue.use(Yh5, {
  components
})
```

## Vue CLI 中使用

```javascript
// vue.config.js

module.exports = {
  transpileDependencies: ['yh5'],
}
```