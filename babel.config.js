module.exports = {
  presets: [
    '@vue/babel-preset-jsx',
    [
      '@babel/preset-env',
      {
        'modules': false,
        'useBuiltIns': 'usage',
        'corejs': {
          'version': 3
        }
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      },
      'element-ui'
    ]
  ],
  sourceType: 'unambiguous'
}

