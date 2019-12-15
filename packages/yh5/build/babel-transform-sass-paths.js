const { join, dirname, relative } = require('path')
const wrapListener = require('babel-plugin-detective/wrap-listener')

module.exports = wrapListener(listener, 'transform-sass-paths')

function listener(path, file) {
  if (path.isLiteral() && (path.node.value.endsWith('.sass') || path.node.value.endsWith('.scss'))) {
    let from = dirname(relative(file.opts.cwd, file.opts.filename))
    from = from.replace(from.split('/')[0], 'lib')
    const to = from.replace(from.split('/')[0], 'src')
    path.node.value = join(relative(from, to), path.node.value)
  }
}