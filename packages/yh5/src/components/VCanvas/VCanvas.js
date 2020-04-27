import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'

// Components
import VSketch from '../VSketch'
import VCanvasElement from './VCanvasElement'

// Mixins
import CreateElementByObject from '../../mixins/create-element-by-object'

// Directives
import resize from '../../directives/resize'

const baseMixins = mixins(
  VSketch,
  CreateElementByObject,
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

  directives: {
    resize,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    editable: Boolean,
    appear: Boolean,
    lazy: Boolean,
    lazyOnce: Boolean,
    absolute: Boolean,
    fixed: Boolean,
    parent: Boolean,
    background: String,
    backgroundPosition: {
      type: String,
      default: 'center center'
    },
    backgroundSize: {
      type: String,
      default: '100% 100%'
    },
    hideElements: Boolean,
  },

  computed: {
    classes () {
      let classes = {
        'v-canvas': true,
      }

      if (this.editable) {
        classes = Object.assign(classes, (VSketch.options.computed.classes.call(this)))
      }

      return classes
    },
  },

  methods: {
    genBackground () {
      return this.$createElement('div', {
        staticClass: 'v-canvas__background',
        style: {
          backgroundImage: `url(${this.background})`,
          backgroundPosition: this.backgroundPosition,
          backgroundSize: this.backgroundSize,
        },
      })
    },
    handleItem (obj, index, isRoot = true) {
      if (!isRoot) return obj

      let item = { ...obj }
      item.props = item.props || {}
      item.props.tag = item.tag

      item.index = index
      item.appear = this.appear
      item.lazy = this.lazy
      item.lazyOnce = this.lazyOnce

      if (this.$scopedSlots[`item-${index}`] || this.$scopedSlots[item.name]) {
        item.scopedSlots = {
          render: this.$scopedSlots[`item-${index}`] || this.$scopedSlots[item.name]
        }
      }

      if (this.editable) {
        item.on = item.on || {}
        item.on['size-booted'] = val => Object.keys(val).forEach(name => {
          if (item[name] === undefined) {
            this.$set(this.internalValue[index], name, val[name])
          }
        })
        item.on['position-booted'] = val => Object.keys(val).forEach(name => {
          if (item[name] === undefined) {
            this.$set(this.internalValue[index], name, val[name])
          }
        })
        item.on['click'] = event => {
          this.selectedIndex = index
          event.preventDefault()
          event.stopPropagation()
        }
        item.on['mouseenter'] = () => this.hoverIndex = index
        item.on['mouseleave'] = () => this.hoverIndex = null
      }

      return {
        ...item,
        tag: VCanvasElement,
        children: Array.isArray(item.children)
          ? item.children.map((_item, _index) => this.handleItem(_item, _index, false))
          : item.children
      }
    },
    genElements () {
      return this.value
                 .map((item, index) => this.handleItem(item, index, true))
                 .map(object => this.createElementByObject(object))
    },
  },

  render (h) {
    const children = []

    if (this.background) children.push(this.genBackground())

    let element = null

    if (!this.hideElements) {
      if (this.value.length) {
        element = this.genElements()
      } else if (this.$scopedSlots.default) {
        element = this.$scopedSlots.default()
      }
    }

    children.push(
      h('div', {
        staticClass: 'v-canvas__wrapper'
      }, element)
    )

    if (this.editable) {
      if (this.selectedIndex !== null) children.push(this.genElementController())

      if (this.hoverIndex !== null && this.selectedIndex !== this.hoverIndex) {
        children.push(this.genHover())
      }

      children.push(this.genRefLines())
    }

    return h('div', {
      class: this.classes,
      style: this.measurableStyles,
      directives: [{
        name: 'resize',
        value: () => {
          if (!this.resizeWrapper.offsetWidth || !this.resizeWrapper.offsetHeight) {
            this.resizeWrapper.offsetWidth = this.$el.offsetWidth
            this.resizeWrapper.offsetHeight = this.$el.offsetHeight
          }
        },
      }],
      on: {
        click: () => this.selectedIndex = null
      },
    }, children)
  }
})