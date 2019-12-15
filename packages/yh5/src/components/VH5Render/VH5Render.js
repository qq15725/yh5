import './VH5Render.scss'

// Helpers
import mixins from '../../util/mixins'
import { parseStyleText } from '../../util/helpers'

// Components
import VH5RenderItem from './VH5RenderItem'

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
    draggable: Boolean,
  },

  data () {
    return {
      resizeWrapper: {
        offsetWidth: null,
        offsetHeight: null,
      },
    }
  },

  methods: {
    renderItem ({ children, on, ...attrs }) {
      if (Array.isArray(children)) {
        children = children.map(this.renderItem)
      }

      return this.$createElement(VH5RenderItem, {
        attrs,
        props: {
          draggable: this.draggable,
          referenceWidth: this.referenceWidth,
          referenceHeight: this.referenceHeight,
          offsetWidth: this.resizeWrapper.offsetWidth,
          offsetHeight: this.resizeWrapper.offsetHeight,
        },
        on: {
          ...on,
          'update:left': left => this.$set(attrs, 'left', left),
          'update:top': top => this.$set(attrs, 'top', top),
        }
      }, children)
    },
  },

  render (h) {
    let { style, class: staticClass, ...attrs } = this.$attrs

    if (typeof style === 'string') {
      style = parseStyleText(style)
    }

    style = {
      ...style,
      ...this.measurableStyles
    }

    staticClass += ' v-h5-render'

    return h('div', {
      attrs,
      style,
      staticClass,
      directives: [{
        name: 'resize',
        value: () => {
          this.resizeWrapper.offsetWidth = this.$el.offsetWidth
          this.resizeWrapper.offsetHeight = this.$el.offsetHeight
        },
      }]
    }, [
      this.value.map(this.renderItem)
    ])
  }
})