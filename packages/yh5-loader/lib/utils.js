const path = require('path')
const loaderUtils = require('loader-utils')

/**
 * Reference file-loader
 * @see https://github.com/webpack-contrib/file-loader/blob/master/src/index.js
 */
module.exports.genUrl = function (loaderContext, options, context, content) {
  const url = loaderUtils.interpolateName(
    loaderContext,
    options.name || '[contenthash].png',
    {
      context,
      content,
      regExp: options.regExp,
    }
  )

  // outputPath
  let outputPath = url
  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, resourcePath, context)
    } else {
      outputPath = path.posix.join(options.outputPath, url)
    }
  }

  // publicPath
  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`
  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url, resourcePath, context)
    } else {
      publicPath = `${
        options.publicPath.endsWith('/')
          ? options.publicPath
          : `${options.publicPath}/`
        }${url}`
    }
    publicPath = JSON.stringify(publicPath)
  }

  // postTransformPublicPath
  if (options.postTransformPublicPath) {
    publicPath = options.postTransformPublicPath(publicPath)
  }

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    loaderContext.emitFile(outputPath, content)
  }

  return publicPath
}

module.exports.streamToBuffer = function (stream) {
  return new Promise((resolve, reject) => {
    let buffers = []
    stream.on('error', reject)
    stream.on('data', data => buffers.push(data))
    stream.on('end', () => resolve(Buffer.concat(buffers)))
    stream.pack()
  })
}