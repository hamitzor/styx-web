const { watch, src, dest } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')

const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')

const sassFiles = ['src/front-end/scss/*.scss']
const compiledCssDir = 'src/front-end/css'
const minCssDir = 'src/front-end/public/min.css'

const sassTask = () => {
  return src(sassFiles)
    .pipe(sass())
    .pipe(dest(compiledCssDir))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(minCssDir))
}

const jsFiles = ['src/front-end/js/*.js']
const jsMinDir = 'src/front-end/public/min.js'

const jsTask = () => {
  return src(jsFiles)
    .pipe(sourcemaps.init())
    //.pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(jsMinDir))
}

exports.default = () => {
  watch(sassFiles, { ignoreInitial: false }, sassTask)
  watch(jsFiles, { ignoreInitial: false }, jsTask)
}