依托 `v-swiper` 、`v-canvas` 和 `animate.css` 和 `Vuetify` 打造一个简单的轮播海报生成工具

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/swiper-poster.vue">
  <examples-swiper-poster></examples-swiper-poster>
  
  <div slot="template">
  
  ```html
  <template>
    <v-card flat tile>
      <v-row no-gutters class="pa-2">
        <div>只做实现参考（素材加载过慢请耐心等待）</div>
  
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
        <v-col cols="3">
          <v-tabs
            fixed-tabs
            dark
          >
            <v-tab>页面</v-tab>
            <v-tab>素材</v-tab>
            <v-tab-item>
              <div style="height: 800px;" class="overflow-y-auto">
                <v-card
                  v-for="(item, index) in data" :key="index"
                  class="my-3 mx-10"
                  :class="selectedIndex === index ? 'elevation-10' : ''"
                  :outlined="selectedIndex !== index"
                  tile
                  :ripple="false"
                  @click="selectedIndex = index"
                >
                  <v-responsive :aspect-ratio="375/667">
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
              <div style="height: 800px;" class="overflow-y-auto px-2">
                <v-row dense>
                  <v-col
                    v-for="(item, index) in materials" :key="index"
                    cols="6"
                  >
                    <v-card
                      tile
                      flat
                      outlined
                      :ripple="false"
                      @click="selected.push({ ...item })"
                    >
                      <v-img
                        v-if="item.tag === 'img'"
                        :src="item.src"
                        :lazy-src="item.lazySrc"
                        :aspect-ratio="1"
                        class="grey lighten-2"
                      >
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col cols="9">
          <v-card dark flat class="d-flex justify-center align-center fill-height" tile>
            <v-canvas
              v-if="showCanvas"
              v-model="selected"
              :background="(data[selectedIndex] || {}).background"
              appear
              absolute
              editable
              width="375"
              height="667"
              class="white"
            >
            </v-canvas>
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
  
    export default {
      data () {
        return {
          data: [
            {
              background: 'https://picsum.photos/id/1/375/667',
              value: []
            },
            {
              value: []
            }
          ],
          selectedIndex: 0,
          materials: [],
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
          options: {
            direction: 'vertical',
            effect: 'coverflow'
            // noSwiping: true,
            // noSwipingSelector: '.v-swiper__slide',
          },
        }
      },
  
      created () {
        this.materials = this.genMaterials()
      },
  
      watch: {
        async selectedIndex () {
          this.showCanvas = false
          await this.$nextTick()
          this.showCanvas = true
        }
      },
  
      computed: {
        selected: {
          get () {
            return this.data[this.selectedIndex].value || []
          },
          set (val) {
            this.$set(this.data[this.selectedIndex], 'value', val)
          }
        },
      },
  
      methods: {
        genAnimation () {
          return this.animations[~~(Math.random() * this.animations.length)]
        },
        genImage () {
          const id = ~~(Math.random() * 1000)
          return {
            tag: 'img',
            src: `https://picsum.photos/id/${id}/375/375`,
            lazySrc: `https://picsum.photos/id/${id}/10/6`,
            width: 200,
            height: 200,
            class: `animated ${this.genAnimation()} slow`,
          }
        },
        genMaterials () {
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