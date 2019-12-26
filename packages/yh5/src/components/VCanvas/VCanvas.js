import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit, isNumber } from '../../util/helpers'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Components
import VElement from '../VElement'
import VDraggableResizable from '../VDraggableResizable'
import VLine from '../../components/VLine'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Measurable from '../../mixins/measurable'

// Directives
import resize from '../../directives/resize'

// Default values
export const defaultRefLineTypes = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']

const baseMixins = mixins(
  Proxyable,
  Measurable,
  RegistrableProvide('canvas'),
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

  directives: { resize },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    selectedIndex: {
      type: Number,
      default: null,
    },
    editable: Boolean,
    appear: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: true
    },
    referenceWidth: Number,
    referenceHeight: Number,
    background: String,
    hideElements: Boolean,
    threshold: {
      type: Number,
      default: 5
    },
    refLineTypes: {
      type: Array,
      default: () => defaultRefLineTypes,
      validator: val => new Set(val.filter(h => new Set(defaultRefLineTypes).has(h))).size === val.length
    },
  },

  watch: {
    selectedIndex (val) {
      this.lazySelectedIndex = val
    },
  },

  data () {
    return {
      lazySelectedIndex: this.selectedIndex,
      hoverIndex: null,
      items: [],
      refLines: [],
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
    internalSelectedIndex: {
      get () {
        return this.lazySelectedIndex
      },
      set (val) {
        this.lazySelectedIndex = val
        this.$emit('update:selected-index', val)
      },
    },
    selected () {
      return this.internalValue[this.internalSelectedIndex]
    },
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

      const data = {
        attrs: {}
      }

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

      let on = {}
      if (this.editable && !disabled) {
        on['size-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.internalValue[index], name, val[name])
        })
        on['position-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.internalValue[index], name, val[name])
        })

        data.on = data.on || {}
        data.on['click'] = event => {
          this.internalSelectedIndex = index
          event.preventDefault()
          event.stopPropagation()
        }
        data.on['mouseenter'] = () => this.hoverIndex = index
        data.on['mouseleave'] = () => this.hoverIndex = null
      }

      return this.$createElement(VElement, {
        attrs: data.attrs,
        props: {
          index,
          appear: this.appear,
          absolute: this.absolute,
        },
        on,
        scopedSlots: {
          default: () => this.$createElement(item.tag || 'div', data, children)
        }
      })
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
    genElementController () {
      return this.$createElement(VDraggableResizable, {
        staticClass: 'v-canvas__element-controller',
        props: {
          value: {
            top: this.selected.top || 0,
            left: this.selected.left || 0,
            width: this.selected.width || 10,
            height: this.selected.height || 10,
          },
          minWidth: 30,
          minHeight: 30,
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          dragging: this.calculateRefLines,
          dragstop: this.clearRefLines,
          change: val => Object.keys(val).forEach(name => {
            this.$set(this.internalValue[this.internalSelectedIndex], name, val[name])
          })
        },
      })
    },
    register (item) {
      this.items.push(item)
    },
    unregister (item) {
      const found = this.items.find(i => i._uid === item._uid)
      if (!found) return
      this.items = this.items.filter(i => i._uid !== found._uid)
    },
    clearRefLines () {
      this.refLines = []
    },
    getYPos (value) {
      return [
        value.top,
        value.top + value.height / 2,
        value.top + value.height
      ]
    },
    getXPos (value) {
      return [
        value.left,
        value.left + value.width / 2,
        value.left + value.width
      ]
    },
    calculateRefLines (value) {
      const threshold = this.threshold + 1
      const YPos = this.getYPos(value)
      const XPos = this.getXPos(value)
      this.refLines = this.items.filter(item => item.index !== this.internalSelectedIndex).reduce((items, item) => {
        const top = Math.min(value.top, item.top)
        const left = Math.min(value.left, item.left)
        const right = Math.max(value.left + value.width, item.left + item.width)
        const bottom = Math.max(value.top + value.height, item.top + item.height)

        this.refLineTypes.forEach(type => {
          const isCompareX = type.indexOf('h') > -1
          const comparePos = item.refLines[type]
          if ((isCompareX ? XPos : YPos).some(pos => Math.abs(pos - comparePos) < threshold)) {
            if (isCompareX) {
              items.push({
                left: comparePos,
                top,
                length: bottom - top,
                vertical: true,
              })
            } else {
              items.push({
                left,
                top: comparePos,
                length: right - left,
              })
            }
          }
        })

        return items
      }, [])
    },
    genRefLines () {
      return this.refLines.map(props => this.$createElement(VLine, { props }))
    },
  },

  render (h) {
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
    }, [
      this.background && this.genBackground(),
      h('div', {
        staticClass: 'v-canvas__wrapper'
      }, [
        this.$slots.default || !this.hideElements && this.value && this.genElements(),
      ]),
      this.internalSelectedIndex !== null && this.genElementController(),
      this.hoverIndex !== null
      && this.internalSelectedIndex !== this.hoverIndex
      && this.genHover(),
      this.genRefLines(),
    ])
  }
})