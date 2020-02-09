module.exports = {
  title: 'Yh5',
  base: '/',
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
        text: '指南',
        link: '/guide/'
      },
      {
        text: '组件',
        link: '/components/draggable',
      },
      {
        text: '指令',
        link: '/directives/draggable',
      },
      {
        text: '生态系统',
        items: [
          {
            text: '快速链接',
            items: [
              {
                text: '示例',
                link: '/examples/poster',
              },
              {
                text: 'yh5-loader',
                link: '/loader/'
              },
            ]
          },
          {
            text: '社交',
            items: [
              {
                text: 'github',
                link: 'https://github.com/qq15725/yh5'
              },
            ]
          },
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            ['/guide/', '介绍'],
            ['/guide/quickstart', '快速开始'],
            ['/guide/browser-support', '浏览器支持'],
          ]
        },
      ],
      '/components/': [
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
      ],
      '/directives/': [
        {
          title: '指令',
          collapsable: false,
          children: [
            ['/directives/draggable', 'draggable'],
          ]
        },
      ],
      '/examples/': [
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
      ],
      '/loader/': [
        {
          title: 'yh5-loader',
          collapsable: false,
          children: [
            ['/loader/', '介绍'],
          ]
        },
      ],
    }
  },
  chainWebpack (config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')

    config.module.rule('psd')
          .test(/\.psd$/)
          .use('yh5-loader')
          .loader(require.resolve('yh5-loader'))
  }
}