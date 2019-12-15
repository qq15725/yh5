export function install (Vue, { components = {} }) {
  if (Vue.$_yh5_installed) return
  Vue.$_yh5_installed = true;

  (function registerComponents (components) {
    if (components) {
      for (const key in components) {
        Vue.component(key, components[key])
      }
      return true
    }
    return false
  })(components)
}
