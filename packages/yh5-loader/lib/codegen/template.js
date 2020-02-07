module.exports.genName = function (name) {
  return `export var name = '${name}'`
}

module.exports.genWidth = function (width) {
  return `export var width = ${width}`
}

module.exports.genHeight = function (height) {
  return `export var height = ${height}`
}

module.exports.genItems = function (items) {
  let code = ``
  items.forEach(item => {
    code += `{tag: 'img', name: '${item.name}', width: ${item.width}, height: ${item.height}, left: ${item.left}, top: ${item.top}, src: ${item.src} },`
  })
  return `export var items = [${code}]`
}

module.exports.genCode = function (importName, importWidth, importHeight, importItems) {
  return `
  import VCanvas from 'yh5/src/components/VCanvas'
  ${importName}
  ${importWidth}
  ${importHeight}
  ${importItems}
  
  function mergeObject (obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]'
        ? mergeObject(obj1[key], obj2[key])
        : obj1[key] = obj2[key]
    }
    return obj1
  }
 
  export default {
    functional: true,
    render: function (h, vm) {
      var data = vm.data || {}
      data.attrs = mergeObject(data.attrs || {}, {
        referenceWidth: width,
        referenceHeight: height,
        value: items,
        absolute: true,
      })
      return h(VCanvas, data, vm.children || [])
    }
  }
  `
}