const path = require('path')
const loaderUtils = require('loader-utils')
const PSD = require('psd.js')
const { genCode, genName, genHeight, genWidth, genItems, } = require('./codegen/template')
const { genUrl, streamToBuffer } = require('./utils')

module.exports = function (source) {
  const loaderContext = this

  const {
    rootContext,
    resourcePath,
    async,
  } = loaderContext

  const options = loaderUtils.getOptions(loaderContext) || {}
  const context = options.context || rootContext || process.cwd()
  const filename = path.basename(resourcePath)

  let importName = genName(filename)
  let importWidth = genWidth(0)
  let importHeight = genHeight(0)
  let importItems = genItems([])
  const psd = new PSD(source)
  if (!psd.parse()) {
    loaderContext.emitError(new Error(
      `parse PSD failure`
    ))
    return genCode(importName, importWidth, importHeight, importItems)
  }
  const callback = async()
  importWidth = genWidth(psd.header.cols)
  importHeight = genHeight(psd.header.rows)
  const reduceHandle = (items, item) => {
    if (!item.visible()) {
      return items
    }
    if (item.type === 'group') {
      const children = item.children()
      if (Array.isArray(children)) {
        items.push(
          ...children.reduce(reduceHandle, [])
        )
      }
    } else if (item.type === 'layer') {
      items.push(item)
    }
    return items
  }
  const items = psd.tree().children().reduce(reduceHandle, []).reverse().map(async item => {
    return {
      tag: 'img',
      name: item.name,
      width: item.width,
      height: item.height,
      left: item.left,
      top: item.top,
      src: genUrl(loaderContext, options, context, await streamToBuffer(item.layer.image.toPng())),
    }
  })
  Promise.all(items)
         .then(items => callback(null, genCode(importName, importWidth, importHeight, genItems(items))))
         .catch(callback)
}

module.exports.raw = true