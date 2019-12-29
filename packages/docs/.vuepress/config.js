module.exports = {
  base: '/yh5/',
  title: 'Yh5',
  description: '快速搭建中后台(hpaPaaS平台)可视化能力的常用组件库',
  dest: '../../docs',
  port: 2233,
  themeConfig: {
    nav: [
      {
        text: '快速开始',
        link: '/lib/quickstart.md'
      },
      {
        text: 'github',
        link: 'https://github.com/qq15725/yh5'
      }
    ],
    sidebar: {
      '/lib/': [
        ['quickstart', '快速开始'],
        {
          title: '组件',
          collapsable: false,
          children: [
            ['components/v-canvas', 'VCanvas（画布）'],
            ['components/v-swiper', 'VSwiper（VSwiper）'],
            ['components/v-draggable', 'VDraggable（可拖拽）'],
            ['components/v-resizable', 'VResizable（可调整大小）'],
            ['components/v-draggable-resizable', 'VDraggableResizable（可拖拽调整大小）'],
          ]
        },
        {
          title: '指令',
          collapsable: false,
          children: [
            ['directives/draggable', 'draggable（可拖拽）'],
          ]
        },
      ]
    }
  },
  chainWebpack (config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
  }
}