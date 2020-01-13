module.exports = {
  title: 'Yh5',
  base: '/yh5/',
  description: '基于 Vue 2.0 快速搭建中后台（hpaPaaS平台）数据驱动、可视化编辑的组件库',
  dest: '../../docs',
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/logo.png'
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/logo.png'
    }],
    ['link', {
      rel: 'shortcut icon',
      href: '/logo.ico'
    }],
  ],
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: '快速开始',
        link: '/guide/quickstart.md'
      },
      {
        text: 'github',
        link: 'https://github.com/qq15725/yh5'
      }
    ],
    sidebar: [
      {
        title: '指南',
        collapsable: false,
        children: [
          ['/guide/why-yh5', '简介'],
          ['/guide/quickstart', '快速开始'],
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          ['/components/draggable', 'draggable'],
          ['/components/resizable', 'resizable'],
          ['/components/draggable-resizable', 'draggableResizable'],
          ['/components/canvas', 'canvas'],
          ['/components/swiper', 'swiper'],
        ]
      },
      {
        title: '示例',
        collapsable: false,
        children: [
          ['/examples/poster', '图片海报制作'],
          ['/examples/swiper-poster', '轮播海报制作'],
          ['/examples/form-page', '表单页制作'],
          ['/examples/template-page', '微页面制作'],
        ]
      },
      {
        title: '指令',
        collapsable: false,
        children: [
          ['/directives/draggable', 'draggable'],
        ]
      },
    ]
  },
  chainWebpack (config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
  }
}