<template>
  <v-swiper
    :options="options"
    :width="375"
    :height="674"
    max-width="100%"
    max-height="100%"
    :reference-width="375"
    :reference-height="674"
    ref="VSwiper"
  >
    <template #default="{ slides }">
      <v-swiper-slide>
        <v-canvas
          absolute
          :background="require('../../../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png')"
          :hide-elements="!slides.includes(0)"
        >
          <v-canvas-element
            :top="100"
            :left="169"
            :width="37"
            :height="37"
            class="animated fadeIn slow"
            @after-enter="onAfterEnter"
          >
            <img :src="require('../../../assets/FtU_ut-TVuxydRE_R4MCgw0Ab-RE.png')"/>
          </v-canvas-element>
          <v-canvas-element
            :top="150"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="color: #f7d99b; text-align: center; line-height: 1.5; font-size: 16px; font-weight: bold;">
              数字营销与电商创新国际峰会
            </div>
          </v-canvas-element>
          <v-canvas-element
            :top="200"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="color: #f7d99b; text-align: center; font-size: 14px;">
              搭建私域流量  玩转社群营销
            </div>
          </v-canvas-element>
          <v-canvas-element
            :top="298"
            :left="132"
            :width="110"
            :height="39"
            class="animated delay-1s slideInLeft slow"
          >
            <img :src="require('../../../assets/FjfaL3kHpTWemywA-XM508a1uGBI.png')">
          </v-canvas-element>
          <v-canvas-element
            :top="360"
            :left="64"
            :width="246"
            :height="22"
            class="animated delay-1s slideInRight slow"
          >
            <img :src="require('../../../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png')">
          </v-canvas-element>
          <v-canvas-element
            :top="460"
            :left="170"
            :width="31"
            :height="37"
            class="animated fadeIn slow"
          >
            <img :src="require('../../../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png')">
          </v-canvas-element>
          <v-canvas-element
            :top="550"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="text-align: center; color: #f7d99b; line-height: 1.5; font-size: 14px;">2020年2月20日 | 尼罗河大酒店</div>
          </v-canvas-element>
          <v-canvas-element
            :top="570"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="text-align: center; color: #f7d99b; font-size: 14px;">中国 · 广州</div>
          </v-canvas-element>
        </v-canvas>
      </v-swiper-slide>

      <v-swiper-slide>
        <v-canvas
          absolute
          :background="require('../../../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png')"
          :hide-elements="!slides.includes(1)"
        >
          <v-canvas-element
            :top="96"
            :left="33.6"
            :width="316"
            :height="504"
            class="animated fadeIn slow"
          >
            <img style="box-shadow: rgba(247, 217, 155, 0.7) 1px 0 5px;" :src="require('../../../assets/o_1dr89oma6nrm130lam14o6ji19.png')"/>
          </v-canvas-element>
          <v-canvas-element
            :top="129"
            :left="75"
            :width="224"
            :height="22"
            class="animated fadeIn slow"
          >
            <img style="box-shadow: rgba(247, 217, 155, 0.7) 1px 0 5px;" :src="require('../../../assets/FjBufBlrVezvAGcQB7CslClJxW4S.png')"/>
          </v-canvas-element>
          <v-canvas-element
            :top="130"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="text-align: center; color: rgb(0, 0, 0); line-height: 1.5; font-size: 16px; font-weight: bold;">参 会 报 名</div>
          </v-canvas-element>
          <v-canvas-element
            :top="168"
            :left="48"
            :width="288"
            :height="408"
            class="animated delay-1s fadeIn slow"
          >
            <v-swipers-form></v-swipers-form>
          </v-canvas-element>
          <v-canvas-element
            :top="108"
            :left="85"
            :width="205"
            :height="19"
            class="animated fadeIn slow"
          >
            <img :src="require('../../../assets/FnrHwdQ6NL60p-HpR7tSl7gYKUE6.png')">
          </v-canvas-element>
          <v-canvas-element
            :top="500"
            :left="170"
            :width="41"
            :height="37"
            class="animated fadeIn slow"
          >
            <img :src="require('../../../assets/Fi-5mH7-62dKUjdROniYhze9Y2H6.png')">
          </v-canvas-element>
          <v-canvas-element
            :top="550"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="text-align: center; color: #F7D99B; line-height: 1.5; font-size: 14px;">地址：北京明德宾舍新世界中心</div>
          </v-canvas-element>
          <v-canvas-element
            :top="570"
            :left="0"
            :width="375"
            :height="22"
            class="animated fadeIn slow"
          >
            <div style="text-align: center; color: #f7d99b; font-size: 14px;">电话：400-9999-9988</div>
          </v-canvas-element>
        </v-canvas>
      </v-swiper-slide>
    </template>

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

<script>
  // 动画
  import 'animate.css'

  import 'swiper/dist/css/swiper.css'

  import {
    VSwiper,
    VSwiperSlide,
    VCanvas,
    VCanvasElement,
  } from 'yh5/lib/components'

  import VSwipersForm from './form'

  export default {
    components: {
      VSwiper,
      VSwiperSlide,
      VCanvas,
      VCanvasElement,
      VSwipersForm,
    },
    data () {
      return {
        paused: false,
        options: {
          direction: 'vertical',
          effect: 'coverflow'
          // noSwiping: true,
          // noSwipingSelector: '.v-swiper__slide',
        }
      }
    },
    methods: {
      onAfterEnter () {
        console.log('after-enter')
      }
    }
  }
</script>

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