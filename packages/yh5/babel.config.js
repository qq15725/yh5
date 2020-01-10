require('dotenv').config()

const env = process.env.NODE_ENV
const version = process.env.VERSION || require('./package.json').version

module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    ['transform-define', {
      __YH5_VERSION__: version
    }],
  ],
  env: {
    lib: {
      presets: [
        ['@babel/preset-env', {
          targets: 'last 1 chrome version',
          modules: false,
        }],
      ],
    },
  },
}

if (['lib'].includes(env)) {
  module.exports.plugins.push('./build/babel-transform-sass-paths.js')
}