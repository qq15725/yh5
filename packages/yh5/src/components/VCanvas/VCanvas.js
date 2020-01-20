import './VCanvas.scss'

// Helpers
import mixins from '../../util/mixins'
import { isNumber } from '../../util/helpers'

// Components
import VSketch from '../VSketch'
import VCanvasElement from './VCanvasElement'

// Directives
import resize from '../../directives/resize'
import intersect from '../../directives/intersect'

const baseMixins = mixins(
  VSketch,
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
    hideElements: Boolean,
  },

  data () {
    return {
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
    convertXY (value, isX, field) {
      if (
        isX !== null
        && value
        && isNumber(value)
        && this.resizeWrapper.offsetWidth
        && this.resizeWrapper.offsetHeight
        && this.referenceWidth
        && this.referenceHeight
      ) {
        const xRatio = this.resizeWrapper.offsetWidth / this.referenceWidth
        const yRatio = this.resizeWrapper.offsetHeight / this.referenceHeight
        const ratio = Math.min(xRatio, yRatio)
        value *= ratio
        if (isX && ratio === yRatio && field === 'left') {
          value += (this.resizeWrapper.offsetWidth - this.referenceWidth * ratio) / 2
        } else if (!isX && ratio === xRatio && field === 'top') {
          value += (this.resizeWrapper.offsetHeight - this.referenceHeight * ratio) / 2
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
          data.attrs[key] = this.convertXY(data.attrs[key], true, key)
        }
      })

      this.yFields.forEach(key => {
        if (data.attrs[key] !== undefined) {
          data.attrs[key] = this.convertXY(data.attrs[key], false, key)
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
            this.$emit('intersect', {
              index,
              isIntersecting: entries[0].isIntersecting
            })
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
          this.selectedIndex = index
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