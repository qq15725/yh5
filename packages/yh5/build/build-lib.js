'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'lib', 'lib-temp')
shell.cp('-rf', './src', './lib-temp')
shell.mv('./lib-temp/entry-lib.js', './lib-temp/index.js')
shell.exec('yarn run cross-env NODE_ENV=lib babel lib-temp --out-dir lib --source-maps')