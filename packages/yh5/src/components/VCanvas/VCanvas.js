import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit, isNumber } from '../../util/helpers'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Components
import VCanvasElement from './VCanvasElement'
import VCanvasElementController from './VCanvasElementController'
import VLine from '../../components/VLine'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Measurable from '../../mixins/measurable'

// Directives
import resize from '../../directives/resize'

// Default values
export const defaultRefLineDirections = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']

const baseMixins = mixins(
  Proxyable,
  Measurable,
  RegistrableProvide('canvas'),
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

  provide () {
    return {
      canvas: this,
    }
  },

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
    refLineDirections: {
      type: Array,
      default: () => defaultRefLineDirections,
      validator: val => new Set(val.filter(h => new Set(defaultRefLineDirections).has(h))).size === val.length
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
    refLinesAllDirections () {
      return [
        this.refLineDirections.filter(type => type.indexOf('h') > -1),
        this.refLineDirections.filter(type => type.indexOf('h') === -1),
      ]
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
        attrs: {},
        props: {
          tag: item.tag,
          index,
          appear: this.appear,
          absolute: this.absolute,
        },
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
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          dragging: this.calculateRefLines,
          dragstop: this.clearRefLines,
          change: val => Object.keys(val).forEach(name => this.updateSelected(name, val[name]))
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
    getPointsByValue (value) {
      const getPoint = {
        vt: () => value.top,
        vm: () => value.top + value.height / 2,
        vb: () => value.top + value.height,
        hl: () => value.left,
        hm: () => value.left + value.width / 2,
        hr: () => value.left + value.width,
      }

      return this.refLineDirections.reduce((position, key) => {
        position[key] = getPoint[key]()
        return position
      }, {})
    },
    clearRefLines () {
      this.refLines = []
    },
    calculateRefLines (value) {
      const threshold = this.threshold + 1
      const points = this.getPointsByValue(value)
      const items = this.items.filter(item => {
        return item.index !== this.internalSelectedIndex
      }).reduce((items, item) => {
        const top = Math.min(value.top, item.top)
        const left = Math.min(value.left, item.left)
        const right = Math.max(value.left + value.width, item.left + item.width)
        const bottom = Math.max(value.top + value.height, item.top + item.height)
        this.refLinesAllDirections.forEach((directions, index) => {
          directions.forEach(compareDirection => {
            const comparePoint = item.refPoints[compareDirection]
            directions.forEach(direction => {
              const distance = Math.abs(points[direction] - comparePoint)
              if (distance < threshold) {
                let item = {
                  distance,
                  direction,
                  compareDirection,
                }
                if (index === 0) {
                  item = Object.assign(item, {
                    left: comparePoint,
                    top,
                    length: bottom - top,
                    vertical: true,
                  })
                } else {
                  item = Object.assign(item, {
                    left,
                    top: comparePoint,
                    length: right - left,
                  })
                }
                items.push(item)
              }
            })
          })
        })
        return items
      }, []).sort((a, b) => {
        return Math.abs(b.distance - a.distance)
      })

      // 从所有线中取xy上的两根线
      const lines = []
      let i = items.length
      while (i--) {
        if (!lines[0] || lines[0].vertical !== items[i].vertical) {
          lines.push(items[i])
        }
        if (lines.length >= 2) {
          break
        }
      }
      
      this.refLines = lines
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
        !this.hideElements && this.value && this.genElements(),
        this.$slots.default
      ]),
      this.internalSelectedIndex !== null && this.genElementController(),
      this.hoverIndex !== null
      && this.internalSelectedIndex !== this.hoverIndex
      && this.genHover(),
      this.genRefLines(),
    ])
  }
})