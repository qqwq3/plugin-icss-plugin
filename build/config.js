var path = require('path')
var nodeExternals = require('webpack-node-externals')

exports.externals = [{
  vue: 'vue'
}, nodeExternals()]

exports.alias = {
  '@': path.join(__dirname, '../src'),
  vue$: 'vue/dist/vue.esm.js'
}
