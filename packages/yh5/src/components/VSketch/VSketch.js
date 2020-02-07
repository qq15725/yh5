// Scss
import './VSketch.scss'

// Helpers
import mixins from '../../util/mixins'
import { provide as RegistrableProvide } from '../../mixins/registrable'
import { convertToUnit, isNumber } from '../../util/helpers'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Measurable from '../../mixins/measurable'

// Components
import VRefLine from '../VRefLine'
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
    referenceWidth: Number,
    referenceHeight: Number,
    convertAspectRatioAttrs: {
      type: [Array, Boolean],
      default: () => [
        'left', 'right', 'width', 'maxWidth', 'minWidth',
        'top', 'bottom', 'height', 'maxHeight', 'minHeight',
      ]
    }
  },

  data () {
    return {
      items: [],
      refLines: [],
      hoverIndex: null,
      selectedIndex: null,
      resizeWrapper: {
        offsetWidth: null,
        offsetHeight: null,
      },
    }
  },

  watch: {
    selectedIndex (index) {
      this.$emit('selected', index)
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
    horizontalRatio () {
      if (this.resizeWrapper.offsetWidth && this.referenceWidth) {
        return this.resizeWrapper.offsetWidth / this.referenceWidth
      }
      return null
    },
    verticalRatio () {
      if (this.resizeWrapper.offsetHeight && this.referenceHeight) {
        return this.resizeWrapper.offsetHeight / this.referenceHeight
      }
      return null
    },
    aspectRatio () {
      if (this.verticalRatio && this.horizontalRatio) {
        return Math.min(this.verticalRatio, this.horizontalRatio)
      }
      return null
    }
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
    convertToResponsive (value, attr) {
      if (!isNumber(value) || !this.aspectRatio) {
        return value
      }
      if (!this.convertAspectRatioAttrs || !this.convertAspectRatioAttrs.includes(attr)) {
        return value
      }
      value *= this.aspectRatio
      if (this.aspectRatio === this.verticalRatio && attr === 'left') {
        value += (this.resizeWrapper.offsetWidth - this.referenceWidth * this.aspectRatio) / 2
      } else if (this.aspectRatio === this.horizontalRatio && attr === 'top') {
        value += (this.resizeWrapper.offsetHeight - this.referenceHeight * this.aspectRatio) / 2
      }
      return parseInt(value)
    },
    getRefPointsByValue (value) {
      const getPoint = {
        vt: () => parseInt(value.top),
        vm: () => parseInt(value.top + value.height / 2),
        vb: () => parseInt(value.top + value.height),
        hl: () => parseInt(value.left),
        hm: () => parseInt(value.left + value.width / 2),
        hr: () => parseInt(value.left + value.width),
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
        ? [compare.top, compare.top + compare.height, value.internalTop, value.internalTop + value.internalHeight]
        : [compare.left, compare.left + compare.width, value.internalLeft, value.internalLeft + value.internalWidth]
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
        ? [compare.top, compare.top + compare.height, value.internalTop, value.internalTop + value.internalHeight]
        : [compare.left, compare.left + compare.width, value.internalLeft, value.internalLeft + value.internalWidth]
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
        const distance = compare.point - (value.internalLeft + value.internalWidth / 2)
        if (Math.abs(distance) > this.adsorptionThreshold + 1) {
          if (distance > 0) {
            point -= value.internalWidth / 2
          } else {
            point += value.internalWidth / 2
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
        const distance = compare.point - (value.internalTop + value.internalHeight / 2)
        if (Math.abs(distance) > this.adsorptionThreshold + 1) {
          if (distance > 0) {
            point -= value.internalHeight / 2
          } else {
            point += value.internalHeight / 2
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
          ? compare.left - value.internalLeft
          : value.internalLeft + value.internalWidth - compare.left - compare.width
        length = length > 0 ? length : 0
        return {
          left: compare.point > distanceLine.left
            ? value.internalLeft
            : compare.left + compare.width,
          top: value.internalTop > compare.top
            ? distanceLine.top
            : distanceLine.top + distanceLine.length,
          length,
          borderStyle: 'dashed',
        }
      } else {
        if (compare.point === distanceLine.top) return null
        let length = compare.point > distanceLine.top
          ? compare.top - value.internalTop
          : value.internalTop + value.internalHeight - compare.top - compare.height
        length = length > 0 ? length : 0
        return {
          top: compare.point > distanceLine.top
            ? value.internalTop
            : compare.top + compare.height,
          left: value.internalLeft > compare.left
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
      const items = this.items.filter(item => item.index !== this.selectedIndex).reduce((items, item) => {
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
                    top: item.internalTop,
                    left: item.internalLeft,
                    height: item.internalHeight,
                    width: item.internalWidth,
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
          top: convertToUnit(this.hovered.internalTop || 0),
          left: convertToUnit(this.hovered.internalLeft || 0),
          width: convertToUnit(this.hovered.internalWidth || 0),
          height: convertToUnit(this.hovered.internalHeight || 0),
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
            top: this.selected.internalTop || 0,
            left: this.selected.internalLeft || 0,
            width: this.selected.internalWidth || 10,
            height: this.selected.internalHeight || 10,
          },
          absolute: true,
          point: true,
          outlined: true,
          cursor: true,
          minWidth: 5,
          minHeight: 5,
          parent: this.parent,
        },
        on: {
          click: event => {
            event.preventDefault()
            event.stopPropagation()
          },
          dragging: this.calculateRefData,
          dragstop: this.clearRefData,
          change: val => Object.keys(val).forEach(name => {
            if (this.aspectRatio) {
              let value = val[name]
              if (this.aspectRatio === this.verticalRatio && name === 'left') {
                value -= (this.resizeWrapper.offsetWidth - this.referenceWidth * this.aspectRatio) / 2
              } else if (this.aspectRatio === this.horizontalRatio && name === 'top') {
                value -= (this.resizeWrapper.offsetHeight - this.referenceHeight * this.aspectRatio) / 2
              }
              value = value / this.aspectRatio
              this.updateSelected(name, parseInt(value))
            } else {
              this.updateSelected(name, val[name])
            }
          })
        },
        scopedSlots: {
          default: ({ on, style }) => this.$createElement('div', {
            on,
            style,
          })
        }
      })
    },
  }
})