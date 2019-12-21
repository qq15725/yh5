<template>
  <v-h5-render-swiper
    :options="options"
    :value="data"
    :width="375"
    :height="674"
    :reference-width="375"
    :reference-height="674"
  >
  </v-h5-render-swiper>
</template>

<script>
  // 动画
  import 'animate.css'

  import VDemoForm from './VDemoForm'
  import { VH5RenderSwiper } from 'yh5/src'

  export default {
    components: {
      VH5RenderSwiper,
      VDemoForm,
    },

    data () {
      return {
        options: {
          direction: 'vertical'
        },
        data: [
          {
            class: 'xxxxxxxxxx',
            style: 'background: #000;',
            value: [
              {
                tag: 'img',
                src: require('../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png'),
                top: 0,
                left: 0,
                width: 375,
                height: 674,
              },
              {
                tag: 'img',
                src: require('../assets/FtU_ut-TVuxydRE_R4MCgw0Ab-RE.png'),
                top: 100,
                left: (375 - 31 * 1.2) / 2,
                width: 31 * 1.2,
                height: 31 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  lineHeight: 1.5,
                  fontSize: '16px',
                  fontWeight: 'bold'
                },
                top: 150,
                left: 0,
                width: 375,
                height: 22,
                children: '数字营销与电商创新国际峰会',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  fontSize: '14px'
                },
                top: 200,
                left: 0,
                width: 375,
                height: 22,
                children: '搭建私域流量  玩转社群营销',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                top: 674 / 2 - 32.5 * 1.2,
                left: 0,
                width: 375,
                height: 32.5 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated delay-1s slideInLeft slow',
                children: [
                  {
                    tag: 'img',
                    src: require('../assets/FjfaL3kHpTWemywA-XM508a1uGBI.png'),
                    top: 0,
                    left: (375 - 92 * 1.2) / 2,
                    width: 92 * 1.2,
                    height: 32.5 * 1.2,
                  },
                ]
              },
              {
                tag: 'div',
                top: 674 / 2 + 19 * 1.2,
                left: 0,
                width: 375,
                height: 19 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated delay-1s slideInRight slow',
                children: [
                  {
                    tag: 'img',
                    src: require('../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png'),
                    top: 0,
                    left: (375 - 205.5 * 1.2) / 2,
                    width: 205.5 * 1.2,
                    height: 19 * 1.2,
                  },
                ]
              },
              {
                tag: 'img',
                src: require('../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png'),
                top: 460,
                left: (375 - 34.5) / 2,
                width: 34.5 * 1.2,
                height: 31 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  lineHeight: 1.5,
                  fontSize: '14px'
                },
                top: 550,
                left: 0,
                width: 375,
                height: 22,
                children: '2020年2月20日 | 尼罗河大酒店',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  fontSize: '14px'
                },
                top: 570,
                left: 0,
                width: 375,
                height: 22,
                children: '中国 · 广州',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
            ],
          },
          {
            value: [
              {
                tag: 'img',
                src: require('../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png'),
                top: 0,
                left: 0,
                width: 375,
                height: 674,
              },
              {
                tag: 'img',
                src: require('../assets/o_1dr89oma6nrm130lam14o6ji19.png'),
                style: {
                  boxShadow: 'rgba(247, 217, 155, 0.7) 1px 0px 5px'
                },
                top: 80 * 1.2,
                left: 28 * 1.2,
                width: 264 * 1.2,
                height: 420 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../assets/FjBufBlrVezvAGcQB7CslClJxW4S.png'),
                top: 108 * 1.2,
                left: (375 - 188 * 1.2) / 2,
                width: 188 * 1.2,
                height: 22,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: 'rgb(0, 0, 0)',
                  lineHeight: 1.5,
                  fontSize: '16px',
                  fontWeight: 'bold'
                },
                top: 108 * 1.2,
                left: 0,
                width: 375,
                height: 22,
                children: '参 会 报 名',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'v-demo-form',
                top: 140 * 1.2,
                left: 40 * 1.2,
                width: 240 * 1.2,
                height: 340 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated delay-1s fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png'),
                top: 90 * 1.2,
                left: (375 - 205.5) / 2,
                width: 205.5,
                height: 19,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png'),
                top: 500,
                left: (375 - 34.5) / 2,
                width: 34.5 * 1.2,
                height: 31 * 1.2,
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  lineHeight: 1.5,
                  fontSize: '14px'
                },
                top: 550,
                left: 0,
                width: 375,
                height: 22,
                children: '地址：北京明德宾舍新世界中心',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                style: {
                  textAlign: 'center',
                  color: '#f7d99b',
                  fontSize: '14px'
                },
                top: 570,
                left: 0,
                width: 375,
                height: 22,
                children: '电话：400-9999-9988',
                transition: 'custom-classes-transition',
                enterActiveClass: 'animated fadeIn slow',
              },
            ],
          },
        ],
      }
    }
  }
</script>