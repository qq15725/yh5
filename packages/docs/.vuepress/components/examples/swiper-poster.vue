<template>
  <v-card flat tile>
    <v-row no-gutters class="pa-2">
      <v-spacer></v-spacer>

      <v-btn @click="data.push({ value: [] })" class="mx-2" color="primary" small>新增页面</v-btn>

      <v-dialog
        :width="width * 0.8"
        :height="height * 0.8"
      >
        <template #activator="{ on }">
          <v-btn v-on="on" class="mx-2" color="primary" small>预览</v-btn>
        </template>

        <v-swiper
          :options="options"
          :value="data"
          :width="width * 0.8"
          :height="height * 0.8"
          :reference-width="width"
          :reference-height="height"
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
          <v-tab>
            <span>背景</span>
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
                <v-col cols="12" class="text-right">
                  <v-btn @click="genImages" small icon>
                    <v-icon v-text="'refresh'"></v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-for="i in 2" :key="i"
                >
                  <v-row dense>
                    <v-col
                      v-for="(item, index) in images.filter((_, _i) => _i % 2 === i - 1)" :key="index"
                      cols="12"
                    >
                      <v-card
                        tile
                        flat
                        outlined
                        :ripple="false"
                        @click="pushItem({ ...item })"
                      >
                        <v-img
                          v-if="item.tag === 'img'"
                          :src="item.src"
                          :lazy-src="item.lazySrc"
                          :aspect-ratio="item.aspectRatio"
                          class="grey lighten-2"
                          contain
                        >
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div style="height: 700px;" class="overflow-y-auto px-2">
              <v-row dense>
                <v-col cols="12" class="text-right">
                  <v-btn @click="genBackgroundImages" small icon>
                    <v-icon v-text="'refresh'"></v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-for="i in 2" :key="i"
                >
                  <v-row dense>
                    <v-col
                      cols="12"
                      v-if="i === 1"
                    >
                      <v-card
                        tile
                        flat
                        outlined
                        :ripple="false"
                        @click="setBackground(null)"
                      >
                        <v-responsive :aspect-ratio="375/674">
                          <v-row no-gutters justify="center" align="center" class="fill-height">空白</v-row>
                        </v-responsive>
                      </v-card>
                    </v-col>
                    <v-col
                      v-for="(item, index) in backgroundImages.filter((_, _i) => _i % 2 === i - 1)" :key="index"
                      cols="12"
                    >
                      <v-card
                        tile
                        flat
                        outlined
                        :ripple="false"
                        @click="setBackground(item.src)"
                      >
                        <v-img
                          v-if="item.tag === 'img'"
                          :src="item.src"
                          :lazy-src="item.lazySrc"
                          :aspect-ratio="item.aspectRatio"
                          class="grey lighten-2"
                          contain
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
            :width="width"
            :height="height"
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
            <template #default="{ on, style }">
              <v-card :style="style" tile outlined>
                <v-system-bar style="cursor: move;" v-on="on" window dark>
                  <div class="text-truncate">{{ selected.tag }}属性编辑</div>
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

<script>
  import 'animate.css'
  import 'swiper/dist/css/swiper.css'
  import { VSwiper } from 'yh5/lib/components'
  import { genImages } from '../../util/image'

  export default {
    components: {
      VSwiper
    },
    data () {
      return {
        width: 376,
        height: 667,
        panel: {
          left: 0,
          top: 0,
          width: 150,
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
        showCanvas: true,
        options: {
          direction: 'vertical',
          effect: 'coverflow'
          // noSwiping: true,
          // noSwipingSelector: '.v-swiper__slide',
        },
        images: [],
        backgroundImages: [],
      }
    },

    created () {
      this.genImages()
      this.genBackgroundImages()
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
      pushItem (item) {
        this.data[this.selectedPageIndex].value.push(item)
      },
      setBackground (background) {
        this.$set(this.data[this.selectedPageIndex], 'background', background)
      },
      genImages () {
        this.images = genImages(40).map(item => ({
          ...item,
          left: this.width / 2 - item.width / 2,
          top: this.height / 2 - item.height / 2,
          class: 'animated fadeIn slow',
        }))
      },
      genBackgroundImages () {
        this.backgroundImages = genImages(40, 375 / 667)
      },
    }
  }
</script>