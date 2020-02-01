const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    stats: 'minimal',
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name:'assets/[name].[ext]',
          }
        }
      },
      {
        test: /\.psd$/,
        use: [
          {
            loader: 'yh5-psd-loader'
          }
        ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      'yh5-psd-loader': require.resolve('../lib')
    }
  }
}