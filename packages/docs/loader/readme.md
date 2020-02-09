# 介绍

yh5-loader 暂时只支持 psd 文件解析。

## 安装依赖

```bash
npm install yh5-loader --save-dev
```

## Vue CLI 中使用

```javascript
// vue.config.js

module.exports = {
  chainWebpack: config => {
    config.module.rule('psd')
                 .test(/\.psd$/)
                 .use('yh5-loader')
                 .loader(require.resolve('yh5-loader'))
  }
}
```

## PSD解析方式

当尝试导入一个psd后缀文件时

```javascript
import { default as ExampleCanvas, items, name, width, height } from 'example.psd'
```

`ExampleCanvas`为[v-canvas](/components/canvas)的高阶组件，支持[v-canvas](/components/canvas)所有特性。

`items`为类Vue vnode AST的抽象语法树，一个数组。

`name`为psd文件名。

`width`为psd画布宽度。

`height`为psd画布高度。

