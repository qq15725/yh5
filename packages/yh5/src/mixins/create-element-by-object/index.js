import Vue from 'vue'

/**
 * DATA_KEYS
 * @see https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象
 */
export const DATA_KEYS = [
  'class', 'style', 'directives', 'staticClass', 'on', 'nativeOn',
  'attrs', 'props', 'domProps', 'scopedSlots', 'staticStyle',
  'hook', 'transition', 'slot', 'key', 'ref', 'show', 'keepAlive'
]

export default Vue.extend({
  name: 'create-element-by-object',

  props: {
    emptyTag: 'div',
  },

  methods: {
    createElementByObject (object) {
      let data = object.data || {}

      Object.keys(object).forEach(key => {
        if (DATA_KEYS.includes(key)) {
          data[key] = object[key]
        } else if (!['tag', 'data', 'children'].includes(key)) {
          data.attrs = data.attrs || {}
          data.attrs[key] = object[key]
        }
      })

      return this.$createElement(
        object.tag || this.emptyTag,
        data,
        Array.isArray(object.children)
          ? object.children.map(_object => this.createElementByObject(_object))
          : object.children
      )
    },
  },
})