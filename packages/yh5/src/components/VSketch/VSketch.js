// Helpers
import mixins from '../../util/mixins'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Components
import VSketchRefLine from './VSketchRefLine'
import VSketchLabel from './VSketchLabel'

// Default values
export const defaultRefLineDirections = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']

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
      items: [],
      lazySelectedIndex: this.selectedIndex,
      refLines: [],
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
    refLinesAllDirections () {
      return [
        this.refLineDirections.filter(type => type.indexOf('h') > -1),
        this.refLineDirections.filter(type => type.indexOf('h') === -1),
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
    getRefPointsByValue (value) {
      const getPoint = {
        vt: () => value.top,
        vm: () => value.top + value.height / 2,
        vb: () => value.top + value.height,
        hl: () => value.left,
        hm: () => value.left + value.width / 2,
        hr: () => value.left + value.width,
      }

      return this.refLineDirections.reduce((points, key) => {
        points[key] = getPoint[key]()
        return points
      }, {})
    },
    clearRefData () {
      this.refLines = []
    },
    calculateAdsorptionLine (item, value) {
      const compare = item.compare
      const points = item.vertical
        ? [compare.top, compare.top + compare.height, value.top, value.top + value.height]
        : [compare.left, compare.left + compare.width, value.left, value.left + value.width]
      const min = Math.min(...points)
      const max = Math.max(...points)
      if (item.vertical) {
        return {
          left: compare.point,
          top: min,
          length: max - min,
          direction: item.direction,
          vertical: true,
        }
      } else {
        return {
          left: min,
          top: compare.point,
          length: max - min,
          direction: item.direction,
          vertical: false,
        }
      }
    },
    calculateDistanceLine (item, value) {
      const compare = item.compare
      const points = item.vertical
        ? [compare.top, compare.top + compare.height, value.top, value.top + value.height]
        : [compare.left, compare.left + compare.width, value.left, value.left + value.width]
      const oriPoints = [].concat(points)
      points.sort((a, b) => a - b)
      const min = points[1]
      const max = points[2]
      if (![min, max].some(i => ![oriPoints[2], oriPoints[3]].includes(i))) {
        return null
      }
      if (item.vertical) {
        let point = compare.point
        const distance = compare.point - (value.left + value.width / 2)
        if (Math.abs(distance) > this.sketchThreshold + 1) {
          if (distance > 0) {
            point -= value.width / 2
          } else {
            point += value.width / 2
          }
        }
        return {
          top: min,
          left: point,
          length: max - min,
          vertical: true,
        }
      } else {
        let point = compare.point
        const distance = compare.point - (value.top + value.height / 2)
        if (Math.abs(distance) > this.sketchThreshold + 1) {
          if (distance > 0) {
            point -= value.height / 2
          } else {
            point += value.height / 2
          }
        }
        return {
          top: point,
          left: min,
          length: max - min,
        }
      }
    },
    calculateDistanceDashedLine (item, value, distanceLine) {
      const compare = item.compare
      if (item.vertical) {
        if (compare.point === distanceLine.left) return {}
        let length = compare.point > distanceLine.left
          ? compare.left - value.left
          : value.left + value.width - compare.left - compare.width
        length = length > 0 ? length : 0
        return {
          left: compare.point > distanceLine.left
            ? value.left
            : compare.left + compare.width,
          top: value.top > compare.top
            ? distanceLine.top
            : distanceLine.top + distanceLine.length,
          length,
          borderStyle: 'dashed',
        }
      } else {
        if (compare.point === distanceLine.top) return {}
        let length = compare.point > distanceLine.top
          ? compare.top - value.top
          : value.top + value.height - compare.top - compare.height
        length = length > 0 ? length : 0
        return {
          top: compare.point > distanceLine.top
            ? value.top
            : compare.top + compare.height,
          left: value.left > compare.left
            ? distanceLine.left
            : distanceLine.left + distanceLine.length,
          length,
          borderStyle: 'dashed',
          vertical: true,
        }
      }
    },
    calculateRefData (value) {
      const threshold = this.sketchThreshold + 1
      const points = this.getRefPointsByValue(value)
      const items = this.items.filter(item => {
        return item.index !== this.internalSelectedIndex
      }).reduce((items, item) => {
        this.refLinesAllDirections.forEach((directions, index) => {
          directions.forEach(compareDirection => {
            directions.forEach(direction => {
              const point = points[direction]
              const comparePoint = item.refPoints[compareDirection]
              const offsetAmount = Math.abs(point - comparePoint)
              if (offsetAmount < threshold) {
                items.push({
                  offsetAmount,
                  direction,
                  point,
                  compare: {
                    top: item.top,
                    left: item.left,
                    height: item.height,
                    width: item.width,
                    direction: compareDirection,
                    point: comparePoint,
                  },
                  vertical: index === 0,
                })
              }
            })
          })
        })
        return items
      }, []).sort((a, b) => {
        return Math.abs(b.offsetAmount - a.offsetAmount)
      })

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

      this.refLines = lines.map(item => {
        const distanceLine = this.calculateDistanceLine(item, value)
        return [
          this.calculateAdsorptionLine(item, value),
          distanceLine,
          distanceLine
            ? this.calculateDistanceDashedLine(item, value, distanceLine)
            : distanceLine,
        ]
      })
    },
    genRefLines () {
      return this.refLines.map(item => [
        item[0] && this.$createElement(VSketchRefLine, {
          props: Object.assign(item[0], { color: '#FF00CC' })
        }),
        item[1] && this.$createElement(VSketchRefLine, {
          style: {
            overflow: 'visible',
            zIndex: 9991,
          },
          props: Object.assign(item[1], { color: '#0084ff' })
        }, [
          this.$createElement(VSketchRefLine, {
            props: item[1].vertical ? {
              color: '#0084ff',
              top: 0,
              left: -3,
              length: 6,
            } : {
              color: '#0084ff',
              top: -3,
              left: 0,
              length: 6,
              vertical: true,
            },
            style: {
              maxHeight: 'none',
              maxWidth: 'none',
            }
          }),
          this.$createElement(VSketchRefLine, {
            props: item[1].vertical ? {
              color: '#0084ff',
              top: '100%',
              left: -3,
              length: 6,
            } : {
              color: '#0084ff',
              top: -3,
              left: '100%',
              length: 6,
              vertical: true,
            },
            style: {
              maxHeight: 'none',
              maxWidth: 'none',
            }
          }),
          this.$createElement(VSketchLabel, {
            props: {
              color: '#0084ff',
              vertical: item[1].vertical,
            }
          }, [
            item[1].length
          ])
        ]),
        item[2] && this.$createElement(VSketchRefLine, {
          props: Object.assign(item[2], { color: '#0084ff' })
        }),
      ])
    },
  }
})