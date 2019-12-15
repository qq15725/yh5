'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'lib')
shell.exec('yarn run cross-env NODE_ENV=lib babel src --out-dir lib --source-maps -q')