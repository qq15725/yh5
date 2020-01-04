import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit, isNumber } from '../../util/helpers'

// Components
import VSketch from '../VSketch'
import VCanvasElement from './VCanvasElement'
import VCanvasElementController from './VCanvasElementController'
import VDraggable from '../VDraggable'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Measurable from '../../mixins/measurable'

// Directives
import resize from '../../directives/resize'
import intersect from '../../directives/intersect'

const baseMixins = mixins(
  Proxyable,
  Measurable,
  VSketch,
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

  provide () {
    return {
      canvas: this,
    }
  },

  directives: {
    resize,
    intersect,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    editable: Boolean,
    resizable: Boolean,
    appear: Boolean,
    lazy: Boolean,
    absolute: Boolean,
    fixed: Boolean,
    parent: Boolean,
    referenceWidth: Number,
    referenceHeight: Number,
    background: String,
    hideElements: Boolean,
  },

  data () {
    return {
      hoverIndex: null,
      resizeWrapper: {
        offsetWidth: null,
        offsetHeight: null,
      },
      xFields: [
        'left',
        'right',
        'width',
        'maxWidth',
        'minWidth'
      ],
      yFields: [
        'top',
        'bottom',
        'height',
        'maxHeight',
        'minHeight',
      ],
    }
  },

  computed: {
    hovered () {
      return this.internalValue[this.hoverIndex]
    },
  },

  methods: {
    convertToAspectRatio (value, isX = null) {
      if (isX !== null && value && isNumber(value)) {
        if (isX && this.resizeWrapper.offsetWidth && this.referenceWidth) {
          value = value * (this.resizeWrapper.offsetWidth / this.referenceWidth)
        }
        if (!isX && this.resizeWrapper.offsetHeight && this.referenceHeight) {
          value = value * (this.resizeWrapper.offsetHeight / this.referenceHeight)
        }
      }
      return value
    },
    genBackground () {
      return this.$createElement('div', {
        staticClass: 'v-canvas__background',
        style: {
          backgroundImage: `url(${this.background})`
        },
      })
    },
    genElement (item, index, disabled = false) {
      const fields = [
        'class', 'style', 'directives', 'staticClass', 'on', 'nativeOn',
        'attrs', 'props', 'domProps', 'scopedSlots', 'staticStyle',
        'hook', 'transition', 'slot', 'key', 'ref', 'show', 'keepAlive'
      ]

      const excludedField = [
        'tag', 'children'
      ]

      let data = {
        attrs: {},
        props: {
          tag: item.tag,
          index,
          appear: this.appear,
        },
      }

      if (this.absolute) data.props.absolute = true
      if (this.fixed) data.props.fixed = true

      Object.keys(item).forEach(key => {
        if (fields.includes(key)) {
          data[key] = item[key]
        } else if (!excludedField.includes(key)) {
          data.attrs[key] = item[key]
        }
      })

      this.xFields.forEach(key => {
        if (data.attrs[key] !== undefined) {
          data.attrs[key] = this.convertToAspectRatio(data.attrs[key], true)
        }
      })

      this.yFields.forEach(key => {
        if (data.attrs[key] !== undefined) {
          data.attrs[key] = this.convertToAspectRatio(data.attrs[key], false)
        }
      })

      let children = item.children

      if (Array.isArray(children)) {
        children = children.map((x, i) => this.genElement(x, i, true))
      }

      data.directives = data.directives || []

      if (!disabled && this.lazy) {
        data.directives.push({
          name: 'intersect',
          value: entries => {
            this.$set(this.internalValue[index], 'hide', !entries[0].isIntersecting)
          },
        })
      }

      if (!disabled && this.lazy && this.internalValue[index].hide) {
        data.props.tag = 'div'
        delete data.class
        delete data.style
        return this.$createElement(VCanvasElement, data)
      }

      if (this.editable && !disabled) {
        data.on = data.on || {}
        data.on['size-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.internalValue[index], name, val[name])
        })
        data.on['position-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.internalValue[index], name, val[name])
        })
        data.on['click'] = event => {
          this.internalSelectedIndex = index
          event.preventDefault()
          event.stopPropagation()
        }
        data.on['mouseenter'] = () => this.hoverIndex = index
        data.on['mouseleave'] = () => this.hoverIndex = null
      }

      return this.$createElement(VCanvasElement, data, children)
    },
    genElements () {
      return this.value.map((x, i) => this.genElement(x, i, false))
    },
    genHover () {
      return this.$createElement('div', {
        staticClass: 'v-canvas__hovered',
        style: {
          top: convertToUnit(this.hovered.top || 0),
          left: convertToUnit(this.hovered.left || 0),
          width: convertToUnit(this.hovered.width || 0),
          height: convertToUnit(this.hovered.height || 0),
        }
      })
    },
    updateSelected (name, val) {
      this.$set(this.internalValue[this.internalSelectedIndex], name, val)
    },
    genResizeController (axis) {
      let children
      if (axis === 'x') {
        children = this.width
      } else if (axis === 'y') {
        children = this.height
      }

      return this.$createElement(VDraggable, {
        props: {
          value: {
            top: this.height,
            left: this.width,
          },
          axis,
        },
        on: {
          change: ({ top, left }) => this.$emit('size-change', {
            height: top,
            width: left,
          })
        },
        scopedSlots: {
          default: () => this.$createElement('div', {
            staticClass: `v-canvas__resize v-canvas__resize-${axis}`
          }, children)
        }
      })
    },
    genElementController () {
      return this.$createElement(VCanvasElementController, {
        props: {
          value: {
            top: this.selected.top || 0,
            left: this.selected.left || 0,
            width: this.selected.width || 10,
            height: this.selected.height || 10,
          },
          minWidth: 30,
          minHeight: 30,
          parent: this.parent,
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          dragging: this.calculateRefData,
          dragstop: this.clearRefData,
          change: val => Object.keys(val).forEach(name => this.updateSelected(name, val[name]))
        },
      })
    },
  },

  render (h) {
    const children = []

    if (this.background) children.push(this.genBackground())

    children.push(
      h('div', {
        staticClass: 'v-canvas__wrapper'
      }, [
        !this.hideElements && this.value && this.genElements(),
        this.$slots.default
      ])
    )

    if (this.editable) {
      if (this.internalSelectedIndex !== null) children.push(this.genElementController())

      if (this.hoverIndex !== null && this.internalSelectedIndex !== this.hoverIndex) {
        children.push(this.genHover())
      }

      children.push(this.genRefLines())

      if (this.resizable && this.height && this.width) {
        children.push(this.genResizeController('x'))
        children.push(this.genResizeController('y'))
        children.push(this.genResizeController('both'))
      }
    }

    return h('div', {
      staticClass: 'v-canvas',
      style: this.measurableStyles,
      directives: [{
        name: 'resize',
        value: () => {
          this.resizeWrapper.offsetWidth = this.$el.offsetWidth
          this.resizeWrapper.offsetHeight = this.$el.offsetHeight
        },
      }],
    }, children)
  }
})