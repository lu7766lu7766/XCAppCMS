var path = require('path')

var fs = require('fs')

module.exports = {
  // 根目錄
  resolve(dir) {
    return path.join(__dirname, '../..', dir)
  }
}