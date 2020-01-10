// Scss
import './VSketch.scss'

// Helpers
import mixins from '../../util/mixins'
import { provide as RegistrableProvide } from '../../mixins/registrable'
import { convertToUnit } from '../../util/helpers'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Measurable from '../../mixins/measurable'

// Components
import VRefLine from '../VRefLine'
import VDraggable from '../VDraggable'
import VSketchLabel from './VSketchLabel'
import VSketchElementController from './VSketchElementController'

// Default values
export const REFLINE_DIRECTIONS = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']

const baseMixins = mixins(
  Measurable,
  Proxyable,
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
    adsorptionThreshold: {
      type: Number,
      default: 5
    },
    refLineDirections: {
      type: Array,
      default: () => REFLINE_DIRECTIONS,
      validator: val => new Set(val.filter(h => new Set(REFLINE_DIRECTIONS).has(h))).size === val.length
    },
  },

  data () {
    return {
      items: [],
      refLines: [],
      hoverIndex: null,
      selectedIndex: null,
    }
  },

  computed: {
    classes () {
      return {
        'v-sketch': true,
      }
    },
    selected () {
      return this.items.find(item => item.index === this.selectedIndex)
    },
    hovered () {
      return this.items.find(item => item.index === this.hoverIndex)
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
    calculateAdsorptionLine (item) {
      const value = this.selected
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
    calculateDistanceLine (item) {
      const value = this.selected
      const compare = item.compare
      const points = item.vertical
        ? [compare.top, compare.top + compare.height, value.top, value.top + value.height]
        : [compare.left, compare.left + compare.width, value.left, value.left + value.width]
      const oriPoints = [].concat(points)
      points.sort((a, b) => a - b)
      let min = points[0]
      let max = points[3]
      if (min === oriPoints[2]) {
        if (max === oriPoints[3]) return null
        const index = points.indexOf(oriPoints[3])
        min = points[index]
        max = points[index + 1]
      } else if (max === oriPoints[3]) {
        if (min === oriPoints[2]) return null
        const index = points.indexOf(oriPoints[2])
        min = points[index - 1]
        max = points[index]
      } else {
        min = points[1]
        max = points[2]
      }
      if (![min, max].some(i => ![oriPoints[2], oriPoints[3]].includes(i))) return null
      if (item.vertical) {
        let point = compare.point
        const distance = compare.point - (value.left + value.width / 2)
        if (Math.abs(distance) > this.adsorptionThreshold + 1) {
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
        if (Math.abs(distance) > this.adsorptionThreshold + 1) {
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
    calculateDistanceDashedLine (item, distanceLine) {
      if (!distanceLine) return null
      const value = this.selected
      const compare = item.compare
      if (item.vertical) {
        if (compare.point === distanceLine.left) return null
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
        if (compare.point === distanceLine.top) return null
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
      const threshold = this.adsorptionThreshold + 1
      const points = this.getRefPointsByValue(value)
      const items = this.items.filter(item => {
        return item.index !== this.selectedIndex
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
        const distanceLine = this.calculateDistanceLine(item)
        return [
          this.calculateAdsorptionLine(item),
          distanceLine,
          this.calculateDistanceDashedLine(item, distanceLine),
        ]
      })
    },
    genHover () {
      return this.$createElement('div', {
        staticClass: 'v-sketch__hovered',
        style: {
          top: convertToUnit(this.hovered.top || 0),
          left: convertToUnit(this.hovered.left || 0),
          width: convertToUnit(this.hovered.width || 0),
          height: convertToUnit(this.hovered.height || 0),
        }
      })
    },
    genRefLines () {
      return this.refLines.map(item => [
        item[0] && this.$createElement(VRefLine, {
          props: Object.assign(item[0], { color: '#FF00CC' })
        }),
        item[1] && this.$createElement(VRefLine, {
          style: {
            overflow: 'visible',
            zIndex: 9991,
          },
          props: Object.assign(item[1], { color: '#0084ff' })
        }, [
          this.$createElement(VRefLine, {
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
          this.$createElement(VRefLine, {
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
        item[2] && this.$createElement(VRefLine, {
          props: Object.assign(item[2], { color: '#0084ff' })
        }),
      ])
    },
    updateSelected (name, val) {
      this.$set(this.internalValue[this.selectedIndex], name, val)
    },
    genElementController () {
      return this.$createElement(VSketchElementController, {
        props: {
          value: {
            top: this.selected.top || 0,
            left: this.selected.left || 0,
            width: this.selected.width || 10,
            height: this.selected.height || 10,
          },
          minWidth: 30,
          minHeight: 30,
          parent: this.parent,
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          dragging: this.calculateRefData,
          dragstop: this.clearRefData,
          change: val => Object.keys(val).forEach(name => this.updateSelected(name, val[name]))
        },
      })
    },
    genResizeController (axis) {
      let children
      if (axis === 'x') {
        children = this.width
      } else if (axis === 'y') {
        children = this.height
      }

      return this.$createElement(VDraggable, {
        props: {
          value: {
            top: this.height,
            left: this.width,
          },
          axis,
        },
        on: {
          change: ({ top, left }) => this.$emit('size-change', {
            height: top,
            width: left,
          })
        },
        scopedSlots: {
          default: () => this.$createElement('div', {
            staticClass: `v-sketch__resize v-sketch__resize-${axis}`
          }, children)
        }
      })
    },
  }
})