import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import * as VuetifyComponents from 'vuetify/lib/components'

import Yh5 from 'yh5/src'
import * as Yh5Components from 'yh5/src/components'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Vuetify, {
    components: VuetifyComponents
  })

  Vue.use(Yh5, {
    components: Yh5Components
  })

  options.vuetify = new Vuetify({
    icons: {
      iconfont: 'md'
    },
    lang: {
      locales: { 'zh-Hans': zhHans },
      current: 'zh-Hans'
    }
  })
}