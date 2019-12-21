import './VH5Render.scss'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

// Components
import VH5RenderItem from './VH5RenderItem'
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

  name: 'v-h5-render',

  directives: { resize },

  props: {
    value: Array,
    selectedIndex: {
      type: Number,
      default: null,
    },
    editable: Boolean,
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
    genItem (item) {
      let { children, on, ...attrs } = item

      if (Array.isArray(children)) {
        children = children.map(this.genItem)
      }

      return this.$createElement(VH5RenderItem, {
        attrs,
        props: {
          referenceWidth: this.referenceWidth,
          referenceHeight: this.referenceHeight,
          offsetWidth: this.resizeWrapper.offsetWidth,
          offsetHeight: this.resizeWrapper.offsetHeight,
        },
        on,
      }, children)
    },
    genHovered () {
      return this.$createElement('div', {
        staticClass: 'v-h5-render__hover',
        style: {
          top: convertToUnit(this.hovered.top),
          left: convertToUnit(this.hovered.left),
          width: convertToUnit(this.hovered.width),
          height: convertToUnit(this.hovered.height),
        }
      })
    },
    genDraggableAndResizable () {
      return this.$createElement(VDraggableAndResizable, {
        staticClass: 'v-h5-render__draggable-and-resizable',
        props: {
          value: {
            top: this.selected.top || 0,
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
      staticClass: 'v-h5-render',
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
        staticClass: 'v-h5-render__wrapper'
      }, [
        this.value.map((item, index) => {
          const element = this.genItem(item)
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
      this.internalSelectedIndex !== null && h('div', [
        this.genDraggableAndResizable()
      ]),
      this.hoverIndex !== null && this.internalSelectedIndex !== this.hoverIndex && this.genHovered(),
    ])
  }
})