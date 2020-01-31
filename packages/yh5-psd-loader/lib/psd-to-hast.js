const PSD = require('psd.js')

function reduceHandle (items, item) {
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

function toBase64 (image) {
  return new Promise((resolve, reject) => {
    const chunks = []
    image.pack()
    image.on('data', (chunk) => {
      chunks.push(chunk)
    })
    image.on('end', () => {
      resolve(`data:image/png;base64,${Buffer.concat(chunks).toString('base64')}`)
    })
    image.on('error', (err) => {
      reject(err)
    })
  })
}

module.exports = function (source) {
  const psd = new PSD(source)

  if (!psd.parse()) {
    return []
  }

  const items = psd.tree().children().reduce(reduceHandle, []).reverse()

  return new Promise(resolve => {
    Promise.all(items.map(async item => {
      return {
        tag: 'img',
        name: item.name,
        src: await toBase64(item.layer.image.toPng()),
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
      }
    })).then(value => {
      resolve({
        width: psd.header.cols,
        referenceWidth: psd.header.cols,
        height: psd.header.rows,
        referenceHeight: psd.header.rows,
        value
      })
    })
  })
}