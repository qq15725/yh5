import './styles/animate.css'
import yh5 from 'yh5/src/yh5'
import * as components from 'yh5/src/components'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(yh5, {
    components
  })
}