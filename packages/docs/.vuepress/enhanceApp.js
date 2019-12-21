import yh5 from 'yh5/src'
import * as components from 'yh5/src/components'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(yh5, {
    components
  })
}