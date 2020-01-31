const psdToHast = require('./psd-to-hast')

module.exports = function (source, map, meta) {
  const callback = this.async()

  psdToHast(source).then(hast => {
    callback(null, `export default ${JSON.stringify(hast)}`, map, meta)
  })
}

module.exports.raw = true