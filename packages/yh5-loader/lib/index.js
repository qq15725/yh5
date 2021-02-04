const path = require('path')
const loaderUtils = require('loader-utils')
const PSD = require('psd.js')
const {
  genCode,
  genName,
  genHeight,
  genWidth,
  genItems,
} = require('./codegen/template')
const {
  genUrl,
  streamToBuffer
} = require('./utils')

module.exports = function (source) {
  const loaderContext = this

  const {
    rootContext,
    resourcePath,
    async,
  } = loaderContext

  const callback = async()
  const options = loaderUtils.getOptions(loaderContext) || {}
  const context = options.context || rootContext || process.cwd()
  const filename = path.basename(resourcePath)

  let importName = genName(filename)
  let importWidth = genWidth(0)
  let importHeight = genHeight(0)
  const psd = new PSD(source)
  if (!psd.parse()) {
    callback(new Error('parse PSD failure'))
    return
  }
  importWidth = genWidth(psd.header.cols)
  importHeight = genHeight(psd.header.rows)
  const handle = (items, item) => {
    if (!item.visible()) {
      return items
    }
    if (item.type === 'group') {
      const children = item.children()
      if (Array.isArray(children)) {
        items.push(
          ...children.reduce(handle, [])
        )
      }
    } else if (item.type === 'layer') {
      items.push(item)
    }
    return items
  }
  Promise.all(
    psd.tree()
       .children()
       .reduce(handle, [])
       .reverse()
       .map(async item => {
         let src
         try {
           src = genUrl(
             loaderContext,
             options,
             context,
             await streamToBuffer(item.layer.image.toPng())
           )
         } catch (e) {
           src = null
         }
         return {
           tag: 'img',
           name: item.name,
           width: item.width,
           height: item.height,
           left: item.left,
           top: item.top,
           src,
         }
       })
  ).then(items => {
    return callback(
      null,
      genCode(
        importName,
        importWidth,
        importHeight,
        genItems(items)
      )
    )
  }).catch(callback)
}

module.exports.raw = true