module.exports = {
  base: '/yh5/packages/docs/dist/',
  title: 'yh5',
  description: 'yh5',
  dest: './dist',
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
          children: [
            ['components/v-h5-render', 'VH5Render（渲染器）'],
            ['components/v-h5-render-swiper', 'VH5RenderSwiper（渲染器swiper）'],
            ['components/v-draggable', 'VDraggable（可拖拽）'],
            ['components/v-resizable', 'VResizable（可调整大小）'],
            ['components/v-draggable-and-resizable', 'VDraggableAndResizable（可拖拽调整大小）'],
          ]
        },
        {
          title: '指令',
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