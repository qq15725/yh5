import { keys } from '../../util/helpers'

export function createHandlers (value, options) {
  if (typeof value === 'function') {
    value = {
      start: value,
      move: value,
      end: value,
    }
  }

  const wrapper = {
    state: 'dragend',
    dragstartX: 0,
    dragstartY: 0,
    dragendX: 0,
    dragendY: 0,
    dragX: 0,
    dragY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    start: value.start,
    move: value.move,
    end: value.end,
  }

  return {
    mousedown: e => {
      dragstart(e, wrapper)
      const mousemove = e => drag(e, wrapper)
      options = options || false
      const mouseup = e => {
        window.removeEventListener('mousemove', mousemove, options)
        window.removeEventListener('mouseup', mouseup, options)
        dragend(e, wrapper)
      }
      window.addEventListener('mousemove', mousemove, options)
      window.addEventListener('mouseup', mouseup, options)
    }
  }
}

function dragstart (event, wrapper) {
  wrapper.state = 'dragstart'
  wrapper.dragstartX = event.clientX
  wrapper.dragstartY = event.clientY

  wrapper.start && wrapper.start(Object.assign(event, wrapper))
}

function drag (event, wrapper) {
  if (wrapper.state === 'dragend') return
  wrapper.state = 'dragging'
  wrapper.dragX = event.clientX
  wrapper.dragY = event.clientY
  wrapper.dragOffsetX = wrapper.dragX - wrapper.dragstartX
  wrapper.dragOffsetY = wrapper.dragY - wrapper.dragstartY

  wrapper.move && wrapper.move(Object.assign(event, wrapper))
}

function dragend (event, wrapper) {
  wrapper.state = 'dragend'
  wrapper.dragendX = event.clientX
  wrapper.dragendY = event.clientY
  wrapper.dragOffsetX = wrapper.dragendX - wrapper.dragstartX
  wrapper.dragOffsetY = wrapper.dragendY - wrapper.dragstartY

  wrapper.end && wrapper.end(Object.assign(event, wrapper))
}

function inserted (el, binding, vnode) {
  const value = binding.value || {}
  const options = binding.options || false
  const target = value.parent ? el.parentElement : el

  // Needed to pass unit tests
  if (!target) return

  const handlers = createHandlers(value, options)
  target._dragHandlers = Object(target._dragHandlers)
  target._dragHandlers[vnode.context._uid] = handlers
  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options)
  })

  value.inserted && value.inserted(el, binding, vnode)
}

function unbind (el, binding, vnode) {
  const value = binding.value || {}
  const target = value.parent ? el.parentElement : el

  if (!target || !target._dragHandlers) return

  const handlers = target._dragHandlers[vnode.context._uid]
  delete target._dragHandlers[vnode.context._uid]
  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName])
  })

  value.unbind && value.unbind(el, binding, vnode)
}

export const Draggable = {
  inserted,
  unbind,
}

export default Draggable
