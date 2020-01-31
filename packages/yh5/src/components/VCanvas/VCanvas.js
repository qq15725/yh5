import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { isNumber } from '../../util/helpers'

// Components
import VSketch from '../VSketch'
import VCanvasElement from './VCanvasElement'

// Mixins
import CreateElementByObject from '../../mixins/create-element-by-object'

// Directives
import resize from '../../directives/resize'
import intersect from '../../directives/intersect'

// Default values
export const CONVERT_ASPECT_RATIO_ATTRS = [
  ['left', 'right', 'width', 'maxWidth', 'minWidth'],
  ['top', 'bottom', 'height', 'maxHeight', 'minHeight'],
]

const baseMixins = mixins(
  VSketch,
  CreateElementByObject,
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-canvas',

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
    appear: Boolean,
    lazy: Boolean,
    absolute: Boolean,
    fixed: Boolean,
    parent: Boolean,
    referenceWidth: Number,
    referenceHeight: Number,
    background: String,
    backgroundPosition: {
      type: String,
      default: 'center center'
    },
    backgroundSize: {
      type: String,
      default: '100%'
    },
    hideElements: Boolean,
    convertAspectRatioAttrs: {
      type: [Array, Boolean],
      default: () => CONVERT_ASPECT_RATIO_ATTRS
    }
  },

  data () {
    return {
      resizeWrapper: {
        offsetWidth: null,
        offsetHeight: null,
      },
    }
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
    convertAspectRatio (value, isHorizontal, attr) {
      if (
        isHorizontal !== null
        && isNumber(value)
        && this.resizeWrapper.offsetWidth
        && this.resizeWrapper.offsetHeight
        && this.referenceWidth
        && this.referenceHeight
      ) {
        const horizontalRatio = this.resizeWrapper.offsetWidth / this.referenceWidth
        const verticalRatio = this.resizeWrapper.offsetHeight / this.referenceHeight
        const ratio = Math.min(horizontalRatio, verticalRatio)
        value *= ratio
        if (horizontalRatio !== verticalRatio) {
          if (isHorizontal && ratio === verticalRatio && attr === 'left') {
            value += (this.resizeWrapper.offsetWidth - this.referenceWidth * ratio) / 2
          } else if (!isHorizontal && ratio === horizontalRatio && attr === 'top') {
            value += (this.resizeWrapper.offsetHeight - this.referenceHeight * ratio) / 2
          }
        }
      }
      return value
    },
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
    handleItem (obj, index, disabled = false) {
      let item = { ...obj }
      item.props = item.props || {}
      item.props.tag = item.tag

      item.index = index
      item.appear = this.appear

      if (this.absolute) item.absolute = true
      if (this.fixed) item.fixed = true

      const convertAspectRatioAttrs = this.convertAspectRatioAttrs || CONVERT_ASPECT_RATIO_ATTRS

      convertAspectRatioAttrs.forEach((attrs, _index) => {
        attrs.forEach(attr => {
          if (item[attr] !== undefined) {
            item[attr] = this.convertAspectRatio(item[attr], _index % 2 === 0, attr)
          }
        })
      })

      if (!disabled) {
        if (this.lazy) {
          if (this.internalValue[index].hide) {
            item.props.tag = 'div'
            delete item.class
            delete item.style
            return item
          }

          item.directives = item.directives || []
          item.directives.push({
            name: 'intersect',
            value: entries => {
              this.$set(this.internalValue[index], 'hide', !entries[0].isIntersecting)
              this.$emit('intersect', {
                index,
                isIntersecting: entries[0].isIntersecting
              })
            },
          })
        }

        if (this.editable) {
          item.on = item.on || {}
          item.on['size-booted'] = val => Object.keys(val).forEach(name => {
            this.$set(this.internalValue[index], name, val[name])
          })
          item.on['position-booted'] = val => Object.keys(val).forEach(name => {
            this.$set(this.internalValue[index], name, val[name])
          })
          item.on['click'] = event => {
            this.selectedIndex = index
            event.preventDefault()
            event.stopPropagation()
          }
          item.on['mouseenter'] = () => this.hoverIndex = index
          item.on['mouseleave'] = () => this.hoverIndex = null
        }
      }

      return {
        ...item,
        tag: VCanvasElement,
        children: Array.isArray(item.children)
          ? item.children.map((_item, _index) => this.handleItem(_item, _index, true))
          : item.children
      }
    },
    genElements () {
      return this.value
                 .map((item, index) => this.handleItem(item, index, false))
                 .map(object => this.createElementByObject(object))
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
          this.resizeWrapper.offsetWidth = this.$el.offsetWidth
          this.resizeWrapper.offsetHeight = this.$el.offsetHeight
        },
      }],
      on: {
        click: () => this.selectedIndex = null
      },
    }, children)
  }
})