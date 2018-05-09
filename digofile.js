const digo = require('digo')
const path = require('path')
const core = require('./scripts/core')

exports.buildCopy = () => {
  digo.src(path.resolve(core.files.root))
    .dest(path.resolve(core.files.dist))
}

exports.create = () => {
  const options = digo.parseArgs()
  const page = options[1]
  digo.src('./scripts/digo/template/Page')
    .pipe(file => {
      let fileName = file.name
      if (fileName.includes('Page')) {
        fileName = fileName.replace('Page', page)
      }

      digo.writeFileIf(`${core.files.view}/${page}/${fileName}`,
        digo.readFile(file.path)
          .toString()
          .replace(/Page/g, page))
    })
}