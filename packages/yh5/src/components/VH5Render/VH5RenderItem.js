import './VH5RenderItem.scss'

// Helpers
import mixins from '../../util/mixins'
import { parseStyleText } from '../../util/helpers'

// Mixins
import Measurable from '../../mixins/measurable'
import Animationable from '../../mixins/animationable'
import Transitionable from '../../mixins/transitionable'

// Directives
import draggable from '../../directives/draggable'

const baseMixins = mixins(
  Measurable,
  Animationable,
  Transitionable
)

export default baseMixins.extend({
  inheritAttrs: false,

  name: 'v-h5-render-item',

  directives: { draggable },

  props: {
    tag: null,
    position: {
      type: String,
      default: 'absolute'
    },
    appear: {
      type: Boolean,
      default: true
    },
    draggable: Boolean,
  },

  data () {
    return {
      x: null,
      y: null
    }
  },

  methods: {
    genDirectives () {
      const directives = []

      if (this.draggable) {
        directives.push({
          name: 'draggable',
          value: {
            move: event => {
              this.x = this.left + event.dragOffsetX
              this.y = this.top + event.dragOffsetY
            },
            end: event => {
              this.x = null
              this.y = null
              this.$emit('update:left', this.left + event.dragOffsetX)
              this.$emit('update:top', this.top + event.dragOffsetY)
            },
          },
        })
      }

      return directives
    }
  },

  render (h) {
    const measurableStyles = this.measurableStyles

    const y = this.convertToAspectRatioUnit(this.y)
    const x = this.convertToAspectRatioUnit(this.x)

    if (y) measurableStyles.top = y
    if (x) measurableStyles.left = x

    let { style, ...attrs } = this.$attrs

    if (typeof style === 'string') {
      style = parseStyleText(style)
    }
    
    style = {
      ...style,
      ...this.animationableStyles,
      ...measurableStyles
    }

    let item = h(this.tag, {
      attrs,
      style,
      on: this.$listeners,
      directives: this.genDirectives(),
    }, this.$slots.default)

    return this.genTransition(item)
  }
})