import Vue from 'vue'

function generateWarning (child, parent) {
  return () => console.warn(`The ${child} component must be used inside a ${parent}`)
}

export function inject (namespace, child, parent) {
  const defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent),
  } : null

  return Vue.extend({
    name: 'registrable-inject',

    inject: {
      [namespace]: {
        default: defaultImpl,
      },
    },
  })
}

export function provide (namespace, self = false) {
  return Vue.extend({
    name: 'registrable-provide',

    methods: self ? {} : {
      register: null,
      unregister: null,
    },
    provide () {
      return {
        [namespace]: self ? this : {
          register: this.register,
          unregister: this.unregister,
        },
      }
    },
  })
}
