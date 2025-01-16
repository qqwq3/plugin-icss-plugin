const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./build/config')

const components = require('./packages/index.json')
const entrys = {}
Object.keys(components).forEach(item => {
  entrys[item] = ['core-js/stable', components[item]]
})

module.exports = {
  mode: 'production',
  entry: { index: ['core-js/stable', './src/index.js'], ...entrys },
  output: {
    path: path.resolve(__dirname, './lib'),
    publicPath: './lib/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  plugins: [
    new ExtractTextPlugin({
      filename: 'theme/[name].css',
      allChunks: true
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            outputPath: 'theme/images'
          }
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts',
            outputPath: 'theme/fonts'
          }
        }]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: 'babel-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  }
}
