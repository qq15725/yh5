<template>
  <v-card flat tile>
    <v-row no-gutters class="pa-2">
      <v-spacer></v-spacer>

      <v-btn @click="genPoster" :loading="loading" class="mx-2" color="primary" small>生成海报</v-btn>
    </v-row>

    <v-row no-gutters>
      <v-col cols="4">
        <v-tabs
          vertical
          icons-and-text
          dark
        >
          <v-tab>
            <span>图片</span>
            <v-icon v-text="'image'"></v-icon>
          </v-tab>
          <v-tab>
            <span>背景</span>
            <v-icon v-text="'image'"></v-icon>
          </v-tab>
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
                        @click="data.push({ ...item })"
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
                        @click="background = null"
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
                        @click="background = item.src"
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
        <v-card dark flat class="pa-3 d-flex justify-center align-center" tile>
          <v-canvas
            ref="canvas"
            v-model="data"
            :background="background"
            :width="width"
            :height="height"
            absolute
            :editable="editable"
            class="white"
          >
          </v-canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import 'animate.css'
  import html2canvas from 'html2canvas'
  import { genImages } from '../../util/image'

  export default {
    data () {
      return {
        width: 376,
        height: 667,
        data: [],
        background: null,
        editable: true,
        loading: false,
        images: [],
        backgroundImages: [],
      }
    },

    created () {
      this.genImages()
      this.genBackgroundImages()
    },

    methods: {
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
      async genPoster () {
        this.loading = true
        this.editable = false
        await this.$nextTick()
        setTimeout(() => {
          html2canvas(this.$refs.canvas.$el, {
            logging: process.env.NODE_ENV !== 'production',
            useCORS: true,
            allowTaint: false,
            scrollX: 0,
            scrollY: 0,
            scale: 3,
          }).then(canvas => {
            const image = new Image()
            image.src = canvas.toDataURL('image/png')
            image.style = 'width: 375px; height: 667px;'
            const w = window.open('')
            w.document.write(image.outerHTML)
            this.editable = true
            this.loading = false
          })
        }, 200)
      },
    }
  }
</script>