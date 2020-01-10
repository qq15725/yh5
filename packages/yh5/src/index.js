import * as components from './components'
import * as directives from './directives'
import Yh5 from './framework'

export default Yh5

Yh5.install = (Vue, args) => {
  install.call(Yh5, Vue, {
    components,
    directives,
    ...args,
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Yh5)
}