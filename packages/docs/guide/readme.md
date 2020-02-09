# 介绍

Yh5是Vue.js的轻量级组件库，目的是使开发者能够快速构建**H5页(low-code)**、**H5页制作平台(low-code/no-code)**。

## Photoshop的psd解析支持

适用于构建H5页，大多数流程是由Photoshop设计师提供psd文件，前端开发者导出图片并计算出相对于目标设备的坐标宽高。

现在使用[yh5-loader](/loader/)，可以很方便的将psd文件转化为基于[v-canvas](/components/canvas)的高阶组件，组件化的构建响应式视图。

通过对psd图层合并、[v-canvas](/components/canvas)插槽，你可以很快的编写带动画的H5页。

## 关于文档示例使用的UI库

由于Yh5本身不专注UI，所以示例部分使用的UI库是极具语义化的[Vuetify](https://vuetifyjs.com/)。