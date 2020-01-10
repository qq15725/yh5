依托 `v-canvas` 和 `Vuetify` 和 `html2canvas` 打造一个简单的图片海报生成工具

<v-code-card url="https://github.com/qq15725/yh5/blob/master/packages/docs/.vuepress/components/examples/poster.vue">

<examples-poster></examples-poster>

<div slot="template">

```html
<template>
  <v-card>
    <v-row no-gutters class="pa-2">
      <v-dialog
        :width="300"
        v-model="showImageForm"
      >
        <template #activator="{ on }">
          <v-btn v-on="on" class="mx-2" color="primary" small>添加图片</v-btn>
        </template>

        <v-form
          @submit.prevent="() => { data.push({tag: 'img',src: form.image, width: 50, height: 50}); showImageForm = false }"
        >
          <v-card>
            <v-card-text class="pa-3">
              <v-text-field v-model="form.image" label="链接"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" small>添加</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-dialog
        :width="300"
        v-model="showBackgroundForm"
      >
        <template #activator="{ on }">
          <v-btn v-on="on" class="mx-2" color="primary" small>设置背景</v-btn>
        </template>

        <v-form
          @submit.prevent="() => { background = form.background; showBackgroundForm = false }"
        >
          <v-card>
            <v-card-text class="pa-3">
              <v-text-field v-model="form.background" label="链接"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" small>添加</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-spacer></v-spacer>

      <v-btn @click="genPoster" :loading="loading" class="mx-2" color="primary" small>生成海报</v-btn>
    </v-row>

    <v-card-text>
      <v-card dark flat class="pa-3 d-flex justify-center align-center" tile>
        <v-canvas
          ref="canvas"
          v-model="data"
          :background="background"
          width="375"
          height="667"
          absolute
          :editable="editable"
          class="white"
        >
        </v-canvas>
      </v-card>
    </v-card-text>
  </v-card>
</template>
```  
  
</div>

<div slot="script">

```html
<script>
  import html2canvas from 'html2canvas'

  export default {
    data () {
      return {
        showImageForm: false,
        showBackgroundForm: false,
        form: {
          background: 'https://picsum.photos/id/1/375/667',
          image: 'https://picsum.photos/id/11/500/300',
        },
        data: [],
        background: 'https://picsum.photos/id/1/375/667',
        editable: true,
        loading: false,
      }
    },

    methods: {
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
```  

</div>

</v-code-card>
