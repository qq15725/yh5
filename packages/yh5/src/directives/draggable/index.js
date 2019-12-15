import { keys } from '../../util/helpers'

function dragstart (event, wrapper) {
  const img = document.createElement('img')
  img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  event.dataTransfer.setDragImage(img, 0, 0)

  wrapper.dragstartX = event.clientX
  wrapper.dragstartY = event.clientY

  event.target.classList.add('dragging')

  wrapper.start && wrapper.start(Object.assign(event, wrapper))
}

function drag (event, wrapper) {
  wrapper.dragX = event.clientX
  wrapper.dragY = event.clientY

  // 防抖
  const absDragOffsetX = Math.abs(wrapper.dragX - wrapper.dragstartX)
  if (absDragOffsetX < 100
    || absDragOffsetX < 2 * Math.abs(wrapper.dragOffsetX)) {
    wrapper.dragOffsetX = wrapper.dragX - wrapper.dragstartX
    wrapper.dragOffsetY = wrapper.dragY - wrapper.dragstartY
  }

  wrapper.move && wrapper.move(Object.assign(event, wrapper))
}

function dragend (event, wrapper) {
  wrapper.dragendX = event.clientX
  wrapper.dragendY = event.clientY
  wrapper.dragOffsetX = wrapper.dragendX - wrapper.dragstartX
  wrapper.dragOffsetY = wrapper.dragendY - wrapper.dragstartY

  event.target.classList.remove('dragging')

  wrapper.end && wrapper.end(Object.assign(event, wrapper))
}

function createHandlers (value) {
  const wrapper = {
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
    dragstart: e => dragstart(e, wrapper),
    drag: e => drag(e, wrapper),
    dragend: e => dragend(e, wrapper)
  }
}

function inserted (el, binding, vnode) {
  const value = binding.value
  const target = value.parent ? el.parentElement : el
  const options = value.options || { passive: true }

  // Needed to pass unit tests
  if (!target) return

  target.draggable = true
  target.classList.add('draggable')

  const handlers = createHandlers(binding.value)
  target._dragHandlers = Object(target._dragHandlers)
  target._dragHandlers[vnode.context._uid] = handlers

  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options)
  })
}

function unbind (el, binding, vnode) {
  const target = binding.value.parent ? el.parentElement : el
  if (!target || !target._dragHandlers) return

  const handlers = target._dragHandlers[vnode.context._uid]

  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName])
  })

  delete target.draggable
  target.classList.remove('draggable')
  delete target._dragHandlers[vnode.context._uid]
}

export const Draggable = {
  inserted,
  unbind,
}

export default Draggable
