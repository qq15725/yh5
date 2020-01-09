### 使用

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/swipers/usage.vue">

<examples-swipers-usage></examples-swipers-usage>

<div slot="template">

```html
<template>
  <v-swiper
    :options="options"
    :value="data"
    :width="375"
    :height="674"
    :reference-width="375"
    :reference-height="674"
    ref="VSwiper"
  >
    <template #pagination>
      <div
        class="music-button animated rotating infinite"
        :style="{ animationPlayState: paused ? 'paused' : '' }"
        @click="paused = !paused"
      >
      </div>

      <div class="up-arrow animated arrow-move slow infinite"/>
    </template>
  </v-swiper>
</template>

<style scoped>
  .music-button {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    z-index: 10;
    border-radius: 15px;
    background-image: url(../../../assets/music-button.svg);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .up-arrow {
    position: absolute;
    width: 24px;
    height: 18px;
    bottom: 20px;
    left: calc(50% - 12px);
    z-index: 10;
    background-image: url(../../../assets/up-arrow.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .rotating {
    animation-name: rotating;
    animation-timing-function: linear;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(1turn);
    }
  }

  .arrow-move {
    animation-name: arrow-move;
  }

  @keyframes arrow-move {
    0% {
      bottom: 10px;
      opacity: 0;
    }

    50% {
      bottom: 15px;
      opacity: 1;
    }
    100% {
      bottom: 20px;
      opacity: 0;
    }
  }
</style>
```  
  
</div>

<div slot="script">

```html
<script>
  // 动画
  import 'animate.css'
  import 'swiper/dist/css/swiper.css'

  import VSwipersForm from './form'

  export default {
    data () {
      return {
        paused: false,
        options: {
          direction: 'vertical',
          effect: 'coverflow'
          // noSwiping: true,
          // noSwipingSelector: '.v-swiper__slide',
        },
        data: [
          {
            background: require('../../../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png'),
            value: [
              {
                tag: 'img',
                src: require('../../../assets/FtU_ut-TVuxydRE_R4MCgw0Ab-RE.png'),
                top: 100,
                left: (375 - 31 * 1.2) / 2,
                width: 31 * 1.2,
                height: 31 * 1.2,
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
              },
              {
                tag: 'div',
                top: 674 / 2 - 32.5 * 1.2,
                left: 0,
                width: 375,
                height: 32.5 * 1.2,
                class: 'animated delay-1s slideInLeft slow',
                children: [
                  {
                    tag: 'img',
                    src: require('../../../assets/FjfaL3kHpTWemywA-XM508a1uGBI.png'),
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
                class: 'animated delay-1s slideInRight slow',
                children: [
                  {
                    tag: 'img',
                    src: require('../../../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png'),
                    top: 0,
                    left: (375 - 205.5 * 1.2) / 2,
                    width: 205.5 * 1.2,
                    height: 19 * 1.2,
                  },
                ]
              },
              {
                tag: 'img',
                src: require('../../../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png'),
                top: 460,
                left: (375 - 34.5) / 2,
                width: 34.5 * 1.2,
                height: 31 * 1.2,
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
              },
            ],
          },
          {
            background: require('../../../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png'),
            value: [
              {
                tag: 'img',
                src: require('../../../assets/o_1dr89oma6nrm130lam14o6ji19.png'),
                style: {
                  boxShadow: 'rgba(247, 217, 155, 0.7) 1px 0px 5px'
                },
                top: 80 * 1.2,
                left: 28 * 1.2,
                width: 264 * 1.2,
                height: 420 * 1.2,
                class: 'animated fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../../../assets/FjBufBlrVezvAGcQB7CslClJxW4S.png'),
                top: 108 * 1.2,
                left: (375 - 188 * 1.2) / 2,
                width: 188 * 1.2,
                height: 22,
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
              },
              {
                tag: VSwipersForm,
                top: 140 * 1.2,
                left: 40 * 1.2,
                width: 240 * 1.2,
                height: 340 * 1.2,
                class: 'animated delay-1s fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../../../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png'),
                top: 90 * 1.2,
                left: (375 - 205.5) / 2,
                width: 205.5,
                height: 19,
                class: 'animated fadeIn slow',
              },
              {
                tag: 'img',
                src: require('../../../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png'),
                top: 500,
                left: (375 - 34.5) / 2,
                width: 34.5 * 1.2,
                height: 31 * 1.2,
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
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
                class: 'animated fadeIn slow',
              },
            ],
          },
        ],
      }
    }
  }
</script>
```  

</div>
</v-code-card>
