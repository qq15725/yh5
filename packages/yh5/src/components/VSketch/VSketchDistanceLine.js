// Scss
import './VSketchDistanceLine.scss'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mergeData from '../../util/mergeData'

export default {
  name: 'v-sketch-distance-line',
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
      default: '#0084ff'
    },
  },
  render (h, { props, data }) {
    if (props.length <= 0) {
      return null
    }

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
      'v-sketch-distance-line': true,
      'v-sketch-distance-line--absolute': props.absolute,
      'v-sketch-distance-line--fixed': props.fixed,
      'v-sketch-distance-line--vertical': props.vertical,
    }

    return h(props.tag, mergeData(data, {
      class: classes,
      style: styles,
    }), [
      h('div', {
        staticClass: 'v-sketch-distance-line--chip',
      }, [
        h('div', {
          staticClass: 'v-sketch-distance-line--chip__content',
          style: {
            backgroundColor: props.color,
          }
        }, [
          props.length
        ])
      ]),
    ])
  }
}