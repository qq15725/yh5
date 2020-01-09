// Scss
import './VRefLine.scss'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mergeData from '../../util/mergeData'

export default {
  name: 'v-ref-line',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    absolute: {
      type: Boolean,
      default: true
    },
    fixed: Boolean,
    top: [Number, String],
    left: [Number, String],
    borderStyle: String,
    length: [Number, String],
    vertical: Boolean,
    color: String,
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
    if (props.borderStyle) styles.borderStyle = props.borderStyle

    let classes = {
      'v-ref-line': true,
      'v-ref-line--absolute': props.absolute,
      'v-ref-line--fixed': props.fixed,
      'v-ref-line--vertical': props.vertical,
    }

    return h(props.tag, mergeData(data, {
      class: classes,
      style: styles,
    }), children)
  }
}