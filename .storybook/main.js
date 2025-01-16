const path = require('path')

module.exports = {
  stories: ['../packages/components/**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-controls', '@storybook/addon-actions'],
  webpackFinal: async(config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    })

    config.resolve.alias = {
      '@': path.join(__dirname, '../src'),
      vue$: 'vue/dist/vue.esm.js'
    }

    return config
  }
}
