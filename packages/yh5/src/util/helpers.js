export function convertToUnit (str, unit = 'px') {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export function keys (o) {
  return Object.keys(o)
}

export function isNumber (obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

export function isDef (v) {
  return v !== undefined && v !== null
}