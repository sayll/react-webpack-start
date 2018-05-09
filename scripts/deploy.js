const digo = require('digo')

digo.exec(`webpack --progress --color --config ./scripts/webpack/webpack.prod.js #`)

digo.exec(`digo buildCopy`)