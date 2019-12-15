module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
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