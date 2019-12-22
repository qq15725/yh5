import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit, isNumber } from '../../util/helpers'

// Components
import VElement from '../VElement'
import VDraggableAndResizable from '../VDraggableAndResizable'

// Mixins
import Measurable from '../../mixins/measurable'

// Directives
import resize from '../../directives/resize'

const baseMixins = mixins(
  Measurable,
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
    referenceWidth: Number,
    referenceHeight: Number,
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
    genElement (item) {
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
        children = children.map(this.genElement)
      }

      return this.$createElement(VElement, {
        class: _class,
        style,
        attrs,
        props: {
          appear: true,
          absolute: true,
        },
        on,
      }, children)
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
      return this.$createElement(VDraggableAndResizable, {
        staticClass: 'v-canvas__element-controller',
        props: {
          value: {
            top: this.selected.top,
            left: this.selected.left,
            width: this.selected.width,
            height: this.selected.height,
          }
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          input: val => Object.keys(val).forEach(name => {
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
      h('div', {
        staticClass: 'v-canvas__wrapper'
      }, [
        this.value.map((item, index) => {
          const element = this.genElement(item)
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
      ]),
      this.internalSelectedIndex !== null && this.genElementController(),
      this.hoverIndex !== null
      && this.internalSelectedIndex !== this.hoverIndex
      && this.genHover(),
    ])
  }
})