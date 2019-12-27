// Helpers
import mixins from '../../util/mixins'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Components
import VSketchAdsorptionLine from './VSketchAdsorptionLine'

// Default values
export const defaultAdsorptionLineDirections = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']

const baseMixins = mixins(
  RegistrableProvide('sketch'),
)

export default baseMixins.extend({
  name: 'v-sketch',

  provide () {
    return {
      sketch: this,
    }
  },

  props: {
    selectedIndex: {
      type: Number,
      default: null,
    },
    sketchThreshold: {
      type: Number,
      default: 5
    },
    adsorptionLineDirections: {
      type: Array,
      default: () => defaultAdsorptionLineDirections,
      validator: val => new Set(val.filter(h => new Set(defaultAdsorptionLineDirections).has(h))).size === val.length
    },
  },

  watch: {
    selectedIndex (val) {
      this.lazySelectedIndex = val
    },
  },

  data () {
    return {
      items: [],
      lazySelectedIndex: this.selectedIndex,
      // 吸附线
      adsorptionLines: [],
      // 距离线
      distanceLines: [],
      // 间距块
      spacingBlocks: [],
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
    adsorptionLinesAllDirections () {
      return [
        this.adsorptionLineDirections.filter(type => type.indexOf('h') > -1),
        this.adsorptionLineDirections.filter(type => type.indexOf('h') === -1),
      ]
    },
  },

  methods: {
    register (item) {
      this.items.push(item)
    },
    unregister (item) {
      const found = this.items.find(i => i._uid === item._uid)
      if (!found) return
      this.items = this.items.filter(i => i._uid !== found._uid)
    },
    getAdsorptionPointsByValue (value) {
      const getPoint = {
        vt: () => value.top,
        vm: () => value.top + value.height / 2,
        vb: () => value.top + value.height,
        hl: () => value.left,
        hm: () => value.left + value.width / 2,
        hr: () => value.left + value.width,
      }

      return this.adsorptionLineDirections.reduce((points, key) => {
        points[key] = getPoint[key]()
        return points
      }, {})
    },
    // 清除吸附线
    clearAdsorptionLines () {
      this.adsorptionLines = []
    },
    // 计算吸附线
    calculateAdsorptionLines (value) {
      const threshold = this.sketchThreshold + 1
      const points = this.getAdsorptionPointsByValue(value)
      const items = this.items.filter(item => {
        return item.index !== this.internalSelectedIndex
      }).reduce((items, item) => {
        const top = Math.min(value.top, item.top)
        const left = Math.min(value.left, item.left)
        const right = Math.max(value.left + value.width, item.left + item.width)
        const bottom = Math.max(value.top + value.height, item.top + item.height)
        this.adsorptionLinesAllDirections.forEach((directions, index) => {
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

      this.adsorptionLines = lines
    },
    genAdsorptionLines () {
      return this.adsorptionLines.map(props => this.$createElement(VSketchAdsorptionLine, { props }))
    },
  }
})