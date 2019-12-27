// Scss
import './VSketchAdsorptionLine.scss'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mergeData from '../../util/mergeData'

export default {
  name: 'v-sketch-adsorption-line',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'hr',
    },
    absolute: {
      type: Boolean,
      default: true
    },
    fixed: Boolean,
    top: [Number, String],
    left: [Number, String],
    length: [Number, String],
    vertical: Boolean,
    color: {
      type: String,
      default: '#FF00CC'
    },
  },
  render (h, { props, data, children }) {
    let styles = {
      borderColor: props.color,
    }

    const top = convertToUnit(props.top)
    const left = convertToUnit(props.left)
    const length = convertToUnit(props.length)

    if (top) styles.top = top
    if (left) styles.left = left
    if (length) styles[props.vertical ? 'height' : 'width'] = length

    let classes = {
      'v-sketch-adsorption-line': true,
      'v-sketch-adsorption-line--absolute': styles.position,
      'v-sketch-adsorption-line--fixed': styles.fixed,
      'v-sketch-adsorption-line--vertical': props.vertical,
    }

    return h(props.tag, mergeData(data, {
      class: classes,
      style: styles,
    }), children)
  }
}