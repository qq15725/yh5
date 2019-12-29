// Scss
import './VSketchLabel.scss'

// Helpers
import mergeData from '../../util/mergeData'

export default {
  name: 'v-sketch-label',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    vertical: Boolean,
    color: String,
  },
  render (h, { props, data, children }) {
    let styles = {}

    let classes = {
      'v-sketch-label': true,
      'v-sketch-label--vertical': props.vertical,
    }

    return h(props.tag, mergeData(data, {
      class: classes,
      style: styles,
    }), [
      h('div', {
        staticClass: 'v-sketch-label__chip',
        style: {
          backgroundColor: props.color,
        }
      }, [
        children
      ])
    ])
  },
}