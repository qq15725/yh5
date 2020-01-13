依托 `v-swiper` 、`v-canvas` 和 `animate.css` 和 `Vuetify` 打造一个简单的轮播海报生成工具

<v-code-card url="/components/examples/swiper-poster.vue">
  <examples-swiper-poster></examples-swiper-poster>
  
  <div slot="template">
  
  ```html
  <template>
    <v-card flat tile>
      <v-row no-gutters class="pa-2">
        <v-spacer></v-spacer>
  
        <v-btn @click="data.push({ value: [] })" class="mx-2" color="primary" small>新增页面</v-btn>
  
        <v-dialog
          :width="375 * 0.8"
          :height="674 * 0.8"
        >
          <template #activator="{ on }">
            <v-btn v-on="on" class="mx-2" color="primary" small>预览</v-btn>
          </template>
  
          <v-swiper
            :options="options"
            :value="data"
            :width="375 * 0.8"
            :height="674 * 0.8"
            :reference-width="375"
            :reference-height="674"
            ref="VSwiper"
            class="white"
          >
          </v-swiper>
        </v-dialog>
      </v-row>
  
      <v-row no-gutters>
        <v-col cols="4">
          <v-tabs
            vertical
            icons-and-text
            dark
          >
            <v-tab>
              <span>页面</span>
              <v-icon v-text="'pages'"></v-icon>
            </v-tab>
            <v-tab>
              <span>照片</span>
              <v-icon v-text="'image'"></v-icon>
            </v-tab>
            <v-tab-item>
              <div style="height: 700px;" class="overflow-y-auto">
                <v-card
                  v-for="(item, index) in data" :key="index"
                  class="ma-3"
                  :class="selectedPageIndex === index ? 'elevation-10' : ''"
                  :outlined="selectedPageIndex !== index"
                  tile
                  :ripple="false"
                  @click="selectedPageIndex = index"
                >
                  <v-responsive :aspect-ratio="375/674">
                    <v-canvas
                      :value="item.value"
                      :background="item.background"
                      absolute
                      :reference-width="375"
                      :reference-height="674"
                      appear
                    >
                    </v-canvas>
                  </v-responsive>
                </v-card>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div style="height: 700px;" class="overflow-y-auto px-2">
                <v-row dense>
                  <v-col>
                    <v-row dense>
                      <v-col
                        v-for="(item, index) in images.filter((_, i) => i % 2 === 0)" :key="index"
                        cols="12"
                      >
                        <v-card
                          tile
                          flat
                          outlined
                          :ripple="false"
                          @click="selectedPage.push({ ...item })"
                        >
                          <v-img
                            v-if="item.tag === 'img'"
                            :src="item.src"
                            :lazy-src="item.lazySrc"
                            :aspect-ratio="item.aspectRatio"
                            class="grey lighten-2"
                          >
                          </v-img>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col
                        v-for="(item, index) in images.filter((_, i) => i % 2 !== 0)" :key="index"
                        cols="12"
                      >
                        <v-card
                          tile
                          flat
                          outlined
                          :ripple="false"
                          @click="selectedPage.push({ ...item })"
                        >
                          <v-img
                            v-if="item.tag === 'img'"
                            :src="item.src"
                            :lazy-src="item.lazySrc"
                            :aspect-ratio="item.aspectRatio"
                            class="grey lighten-2"
                          >
                          </v-img>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col cols="8">
          <v-card color="grey" flat class="d-flex justify-center align-center fill-height" tile>
            <v-canvas
              v-if="showCanvas"
              v-model="selectedPage"
              :background="(data[selectedPageIndex] || {}).background"
              @selected="val => selectedIndex = val"
              appear
              absolute
              editable
              width="375"
              height="667"
              class="white"
            >
            </v-canvas>
  
            <v-draggable-resizable
              absolute
              parent
              :resizable="false"
              style="z-index: 100;"
              v-model="panel"
              v-if="selected"
            >
              <template #default="{ on }">
                <v-card class="fill-height" tile flat outlined>
                  <v-system-bar style="cursor: move;" v-on="on" window dark>
                    <div class="text-truncate">{{ selected.tag }}</div>
                    <v-spacer></v-spacer>
                  </v-system-bar>
  
                  <v-card-text>
                    TODO
                  </v-card-text>
                </v-card>
              </template>
            </v-draggable-resizable>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </template>
  ```  
    
  </div>
  
  <div slot="script">
  
  ```html
<script>
  import 'animate.css'
  import 'swiper/dist/css/swiper.css'
  import { VSwiper } from 'yh5/lib/components'

  export default {
    components: {
      VSwiper
    },
    data () {
      return {
        panel: {
          left: 0,
          top: 0,
        },
        data: [
          {
            background: 'https://picsum.photos/id/1/375/667',
            value: []
          },
          {
            value: []
          }
        ],
        selectedPageIndex: 0,
        selectedIndex: null,
        images: [],
        showCanvas: true,
        animations: [
          'bounce',
          'flash',
          'pulse',
          'rubberBand',
          'shake',
          'headShake',
          'swing',
          'tada',
          'wobble',
          'jello',
          'bounceIn',
          'bounceInDown',
          'bounceInLeft',
          'bounceInRight',
          'bounceInUp',
          'bounceOut',
          'bounceOutDown',
          'bounceOutLeft',
          'bounceOutRight',
          'bounceOutUp',
          'fadeIn',
          'fadeInDown',
          'fadeInDownBig',
          'fadeInLeft',
          'fadeInLeftBig',
          'fadeInRight',
          'fadeInRightBig',
          'fadeInUp',
          'fadeInUpBig',
          'fadeOut',
          'fadeOutDown',
          'fadeOutDownBig',
          'fadeOutLeft',
          'fadeOutLeftBig',
          'fadeOutRight',
          'fadeOutRightBig',
          'fadeOutUp',
          'fadeOutUpBig',
          'flipInX',
          'flipInY',
          'flipOutX',
          'flipOutY',
          'lightSpeedIn',
          'lightSpeedOut',
          'rotateIn',
          'rotateInDownLeft',
          'rotateInDownRight',
          'rotateInUpLeft',
          'rotateInUpRight',
          'rotateOut',
          'rotateOutDownLeft',
          'rotateOutDownRight',
          'rotateOutUpLeft',
          'rotateOutUpRight',
          'hinge',
          'jackInTheBox',
          'rollIn',
          'rollOut',
          'zoomIn',
          'zoomInDown',
          'zoomInLeft',
          'zoomInRight',
          'zoomInUp',
          'zoomOut',
          'zoomOutDown',
          'zoomOutLeft',
          'zoomOutRight',
          'zoomOutUp',
          'slideInDown',
          'slideInLeft',
          'slideInRight',
          'slideInUp',
          'slideOutDown',
          'slideOutLeft',
          'slideOutRight',
          'slideOutUp',
          'heartBeat',
        ],
        aspectRatioList: [
          1,
          3 / 4,
          9 / 16,
        ],
        options: {
          direction: 'vertical',
          effect: 'coverflow'
          // noSwiping: true,
          // noSwipingSelector: '.v-swiper__slide',
        },
      }
    },

    created () {
      this.images = this.genImages()
    },

    watch: {
      async selectedPageIndex () {
        this.showCanvas = false
        await this.$nextTick()
        this.showCanvas = true
      }
    },

    computed: {
      selectedPage: {
        get () {
          return this.data[this.selectedPageIndex].value || []
        },
        set (val) {
          this.$set(this.data[this.selectedPageIndex], 'value', val)
        }
      },
      selected: {
        get () {
          return this.selectedPage[this.selectedIndex]
        },
        set (val) {
          this.$set(this.selectedPage, this.selectedIndex, val)
        }
      },
    },

    methods: {
      genAnimation () {
        return this.animations[~~(Math.random() * this.animations.length)]
      },
      genAspectRatio () {
        return this.aspectRatioList[~~(Math.random() * this.aspectRatioList.length)]
      },
      genImage () {
        const id = ~~(Math.random() * 100)
        const aspectRatio = this.genAspectRatio()
        return {
          tag: 'img',
          src: `https://picsum.photos/id/${id}/${~~(375 * aspectRatio)}/${~~(375 * (1 / aspectRatio))}`,
          lazySrc: `https://picsum.photos/id/${id}/${~~(6 * aspectRatio)}/${~~(6 * (1 / aspectRatio))}`,
          aspectRatio,
          width: 200,
          height: 200,
        }
      },
      genImages () {
        const items = []
        let i = 40
        while (i--) {
          items.push(this.genImage())
        }
        return items
      },
    }
  }
</script>
  ```  
  
  </div>
 </v-code-card>