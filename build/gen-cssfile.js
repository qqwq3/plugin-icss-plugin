var fs = require('fs')
var path = require('path')
var Components = require('../packages/index.json')

Components = Object.keys(Components)
var basepath = path.resolve(__dirname, '../lib/theme/')

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

Components.forEach(function(key) {
  var fileName = key + '.css'
  var filePath = path.resolve(basepath, fileName)
  if (!fileExists(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8')
    console.log(' 创建遗漏的 ', fileName, ' 文件')
  }
})
