const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const psdToAst = require('./psd-to-ast')

module.exports = function (source, map, meta) {
  const loaderContext = this

  const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

  const {
    rootContext,
    resourcePath,
    async
  } = loaderContext

  const callback = async()

  const name = path.basename(resourcePath).replace('.psd', '')
  const context = rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, resourcePath))
  const dirname = path.join(context, sourceRoot, name)
  const cachedAST = path.join(dirname, 'ast.json')
  if (fs.existsSync(cachedAST)) {
    let ast = fs.readFileSync(cachedAST, 'utf-8')
    ast = ast.replace(/"src":"(.*?)",/g, (_, pos) => `"src":require(${stringifyRequest(path.join(dirname, pos))}),`)
    const code = `export default ${ast}`
    callback(null, code, map, meta)
  } else {
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }
    psdToAst(source, name, (item, index) => {
      const filename = `${index}_${item.left}_${item.top}_${item.width}_${item.height}.png`
      const filepath = path.join(dirname, `${index}_${item.left}_${item.top}_${item.width}_${item.height}.png`)
      if (!fs.existsSync(filepath)) {
        item.layer.image.saveAsPng(filepath)
      }
      return filename
    }).then(ast => {
      ast = JSON.stringify(ast)
      fs.writeFileSync(cachedAST, ast)
      ast = ast.replace(/"src":"(.*?)",/g, (_, pos) => `"src":require(${stringifyRequest(path.join(dirname, pos))}),`)
      const code = `export default ${ast}`
      callback(null, code, map, meta)
    })
  }
}

module.exports.raw = true