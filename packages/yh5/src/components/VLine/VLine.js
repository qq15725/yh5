// Helpers
import { convertToUnit } from '../../util/helpers'
import mergeData from '../../util/mergeData'

export default {
  name: 'v-line',
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
    length: [Number, String],
    vertical: Boolean,
    color: {
      type: String,
      default: '#FF00CC'
    },
  },
  render (h, { props, data, children }) {
    let styles = {
      zIndex: 9999,
      backgroundColor: props.color,
    }

    const top = convertToUnit(props.top)
    const left = convertToUnit(props.left)
    const length = convertToUnit(props.length)

    if (props.absolute) styles.position = 'absolute'
    if (props.fixed) styles.position = 'fixed'
    if (top) styles.top = top
    if (left) styles.left = left

    if (props.vertical) {
      styles.width = '1.1px'
      if (length) styles.height = length
    } else {
      styles.height = '1.1px'
      if (length) styles.width = length
    }

    let classes = {
      'v-line': true,
    }

    return h(props.tag, mergeData(data, {
      class: classes,
      style: styles,
    }), children)
  }
}