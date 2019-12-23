<template>
  <div
    @click="onClick"
  >
    <v-canvas
      v-model="data"
      :background="background"
      :selected-index.sync="selectedIndex"
      :width="375"
      :height="674"
      :reference-width="375"
      :reference-height="674"
      editable
    >
    </v-canvas>
  </div>
</template>

<script>
  // 动画
  import 'animate.css'

  import { VCanvas } from 'yh5/src'

  export default {
    components: {
      VCanvas
    },

    data () {
      return {
        selectedIndex: null,
        background: require('../assets/o_1dr87ok0a1jia16u415aasgh1fsv9.png'),
        data: [
          {
            tag: 'img',
            src: require('../assets/FtU_ut-TVuxydRE_R4MCgw0Ab-RE.png'),
            top: 100,
            left: (375 - 31 * 1.2) / 2,
            width: 31 * 1.2,
            height: 31 * 1.2,
            class: 'animated fadeIn slow'
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
            class: 'animated delay-1s slideInRight slow',
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
        ]
      }
    },

    methods: {
      onClick () {
        this.selectedIndex = null
      }
    }
  }
</script>