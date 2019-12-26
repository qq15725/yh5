import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit, isNumber } from '../../util/helpers'

// Components
import VElement from '../VElement'
import VDraggableResizable from '../VDraggableResizable'

// Mixins
import Measurable from '../../mixins/measurable'
import Sketchable from '../../mixins/sketchable'

// Directives
import resize from '../../directives/resize'

const baseMixins = mixins(
  Measurable,
  Sketchable,
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

  directives: { resize },

  props: {
    value: Array,
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
    hideElements: Boolean
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
      return this.value[this.internalSelectedIndex]
    },
    hovered () {
      return this.value[this.hoverIndex]
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
      let { children, on, style, class: _class, ...attrs } = item

      this.xFields.forEach(key => {
        if (attrs[key] !== undefined) {
          attrs[key] = this.convertToAspectRatio(attrs[key], true)
        }
      })

      this.yFields.forEach(key => {
        if (attrs[key] !== undefined) {
          attrs[key] = this.convertToAspectRatio(attrs[key], false)
        }
      })

      if (Array.isArray(children)) {
        children = children.map((x, i) => this.genElement(x, i, true))
      }

      if (!disabled) {
        on = on || {}
        on['size-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.value[index], name, val[name])
        })
        on['position-booted'] = val => Object.keys(val).forEach(name => {
          this.$set(this.value[index], name, val[name])
        })
      }

      return this.$createElement(VElement, {
        class: _class,
        style,
        attrs,
        props: {
          disabled,
          appear: this.appear,
          absolute: this.absolute,
        },
        on,
      }, children)
    },
    genElements () {
      return this.value.map((item, index) => {
        const element = this.genElement(item, index)
        if (element && this.editable) {
          element.data.on = element.data.on || {}
          this._g(element.data, {
            click: event => {
              this.internalSelectedIndex = index
              event.preventDefault()
              event.stopPropagation()
            },
            mouseenter: () => this.hoverIndex = index,
            mouseleave: () => this.hoverIndex = null,
          })
        }
        return element
      })
    },
    genHover () {
      return this.$createElement('div', {
        staticClass: 'v-canvas__hovered',
        style: {
          top: convertToUnit(this.hovered.top),
          left: convertToUnit(this.hovered.left),
          width: convertToUnit(this.hovered.width),
          height: convertToUnit(this.hovered.height),
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
            this.$set(this.value[this.internalSelectedIndex], name, val[name])
          })
        },
      })
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
        this.$slots.default,
      ]),
      this.internalSelectedIndex !== null && this.genElementController(),
      this.hoverIndex !== null
      && this.internalSelectedIndex !== this.hoverIndex
      && this.genHover(),
      this.genRefLines(),
    ])
  }
})