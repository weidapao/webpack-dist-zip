const path = require('path')
const JSZIP = require('jszip')
const fs = require('fs')

const pluginName = 'WebpackDistZip'

const defaultOption = {
  entry: './dist',
  output: './dist.zip'
}

class WebpackDistZip {
  constructor(options) {
    const mergeOptions = Object.assign(defaultOption, options)
    this.entry = mergeOptions.entry
    this.zipName = mergeOptions.output
    this.zipFile.bind(this)
  }
  zipFile(zip, filePath) {
    const files = fs.readdirSync(path.resolve(filePath), { withFileTypes: true })
    files.map((file) => {
      let realPath = `${filePath}/${file.name}`
      if (file.isDirectory()) {
        const newZip = zip.folder(realPath.replace(`${this.entry}/`, ''))
        this.zipFile(newZip, realPath)
      } else {
        zip.file(file.name, fs.readFileSync(realPath))
      }
    })
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync(pluginName, (stats) => {
      const self = this
      const zip = new JSZIP()
      this.zipFile(zip, self.entry)
      zip
        .generateAsync({
          type: 'nodebuffer',
          compression: 'DEFLATE',
          compressionOptions: {
            level: 9,
          },
        })
        .then(function (content) {
          fs.writeFile(path.resolve(self.zipName), content, (err) => {
            if (err) throw err
            console.log('file has saved')
          })
        })
    })
  }
}

module.exports = WebpackDistZip