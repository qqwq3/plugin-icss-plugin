'use strict'

const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

function compilePure() {
  return src('../src/comStyles/globalPure.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('../lib/comStyles'))
}

function copyScss() {
  return src(['../src/comStyles/**', '!../src/comStyles/globalPure.scss'])
    .pipe(dest('../lib/comStyles'))
}

function copyComponents() {
  return src('../src/components/**')
    .pipe(dest('../lib/components'))
}

exports.build = series(compilePure, copyScss, copyComponents)
