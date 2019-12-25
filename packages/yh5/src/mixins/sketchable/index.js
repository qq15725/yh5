// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Components
import VLine from '../../components/VLine'

export default RegistrableProvide('sketch').extend({
  name: 'sketchable',

  props: {
    threshold: {
      type: Number,
      default: 5
    }
  },

  data () {
    return {
      sketchElements: [],
      lines: [],
    }
  },

  methods: {
    register (element) {
      this.sketchElements.push(element)
    },
    unregister (element) {
      const found = this.sketchElements.find(i => i._uid === element._uid)
      if (!found) return
      this.sketchElements = this.sketchElements.filter(i => i._uid !== found._uid)
    },
    clearRefLines () {
      this.lines = []
    },
    calculateRefLines (value) {
      const threshold = this.threshold + 1
      const keys = ['vt', 'vm', 'vb', 'hl', 'hm', 'hr']
      const vValues = [value.top, value.top + value.height / 2, value.top + value.height]
      const hValues = [value.left, value.left + value.width / 2, value.left + value.width]
      const right = value.left + value.width
      const bottom = value.top + value.height
      this.lines = this.sketchElements.reduce((lines, element) => {
        if (
          Math.abs(value.left - element.left) < threshold
          && Math.abs(value.top - element.top) < threshold
          && Math.abs(value.width - element.width) < threshold
          && Math.abs(value.height - element.height) < threshold
        ) {
          return lines
        }
        const refLines = element.refLines
        keys.forEach(key => {
          const verticalLine = key.indexOf('v') === -1
          const targetVal = refLines[key]
          const values = verticalLine ? hValues : vValues
          if (values.some(val => Math.abs(val - targetVal) < threshold)) {
            let line
            if (verticalLine) {
              line = {
                left: targetVal,
                top: Math.min(value.top, element.top),
                length: Math.max(bottom, element.top + element.height) - Math.min(value.top, element.top),
                vertical: true,
              }
            } else {
              line = {
                left: Math.min(value.left, element.left),
                top: targetVal,
                length: Math.max(right, element.left + element.width) - Math.min(value.left, element.left),
              }
            }
            lines.push(line)
          }
        })
        return lines
      }, [])
    },
    genRefLines () {
      return this.lines.map(props => this.$createElement(VLine, { props }))
    },
  }
})
