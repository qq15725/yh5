// Scss
import './VResizable.scss'

// Components
import VDraggable from '../VDraggable'

// Directives
import { createHandlers } from '../../directives/draggable'

// Helpers
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

const baseMixins = mixins(
  VDraggable
)

export default baseMixins.extend({
  name: 'v-resizable',

  props: {
    value: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0
      }),
    },
    minWidth: {
      type: [String, Number],
      default: 10,
    },
    minHeight: {
      type: [String, Number],
      default: 10,
    },
    breakpoint: {
      type: Number,
      default: 50
    },
  },

  data () {
    return {
      direction: null,
    }
  },

  computed: {
    classes () {
      return {
        'v-resizable--disabled': this.disabled,
        'v-resizable--resizing': this.direction !== null,
      }
    },
    styles () {
      let style = {}

      let width = convertToUnit(this.internalValue.width)
      let height = convertToUnit(this.internalValue.height)

      if (width) style.width = width
      if (height) style.height = height

      return style
    },
  },

  methods: {
    handleMove (event) {
      let value = Object.assign({}, this.internalValue)
      if (this.direction) {
        // 上
        if (this.direction.indexOf('n') > -1) {
          value.height = Math.max(this.originalValue.height - event.dragOffsetY, this.minHeight)
        }
        // 左
        if (this.direction.indexOf('w') > -1) {
          value.width = Math.max(this.originalValue.width - event.dragOffsetX, this.minWidth)
        }
        // 右
        if (this.direction.indexOf('e') > -1) {
          value.width = Math.max(this.originalValue.width + event.dragOffsetX, this.minWidth)
        }
        // 下
        if (this.direction.indexOf('s') > -1) {
          value.height = Math.max(this.originalValue.height + event.dragOffsetY, this.minHeight)
        }
      }
      return value
    },
    genGrip (direction) {
      const isInBreakpoint = this.internalValue.width <= this.breakpoint
        || this.internalValue.height <= this.breakpoint

      if (isInBreakpoint && ['e', 'se', 's'].indexOf(direction) === -1) return null

      return this.$createElement('i', {
        staticClass: `v-resizable__grip v-resizable__grip--${direction}`,
        style: {
          padding: isInBreakpoint ? 0 : undefined
        },
        class: {
          'v-resizable__grip--resizing': this.direction && this.direction === direction,
          'v-resizable__grip--hide': this.direction && this.direction !== direction,
        },
        on: createHandlers({
          start: event => {
            this.direction = direction
            this.onStart(event)
          },
          move: this.onMove,
          end: event => {
            this.direction = null
            this.onEnd(event)
          },
        }),
      })
    },
    genGrips () {
      return [
        this.genGrip('n'),
        this.genGrip('nw'),
        this.genGrip('w'),
        this.genGrip('s'),
        this.genGrip('sw'),
        this.genGrip('ne'),
        this.genGrip('e'),
        this.genGrip('se'),
      ]
    },
  },

  render (h) {
    return h('div', {
      staticClass: 'v-resizable',
      class: this.classes,
      style: this.styles,
    }, [
      !this.disabled && this.genGrips(),

      this.$scopedSlots.default && this.$scopedSlots.default({
        value: this.internalValue,
        style: this.styles,
      })
    ])
  }
})