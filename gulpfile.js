const { watch, src, dest, series, parallel } = require("gulp")
const path = require("path")
const sass = require("gulp-sass")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const concat = require("gulp-concat")
const sourcemaps = require("gulp-sourcemaps")
const cleanCss = require("gulp-clean-css")
//const babel = require("gulp-babel")
//const babelConfig = require("./babel.config")

const jsMap = require("./src/front-end/js-page-map")
const cssMap = require("./src/front-end/css-page-map.js")
const fromNpm = require("./src/front-end/js-from-npm.js")


const sassFiles = ["src/front-end/scss/*.scss"]

const compiledCssDir = "src/front-end/css"
const minCssDir = "src/front-end/public/min.css"

const sassTask = () => {
  return src(sassFiles)
    .pipe(sass())
    .pipe(dest(compiledCssDir))
}

const cssPath = (files) => {
  return files.map(file => path.resolve(compiledCssDir, file + ".css"))
}

const cssPackages = {
  common: cssPath(cssMap.common),
  home: cssPath(cssMap.home)
}

const cssTasks = Object.keys(cssPackages).map(key => {
  const files = cssPackages[key]
  return () => {
    return src(files)
      .pipe(concat(key + "concat.css"))
      .pipe(cleanCss())
      .pipe(rename(key + ".min.css"))
      .pipe(dest(minCssDir))
  }
})

const jsDir = "src/front-end/js"
const jsFiles = jsDir + "/*.js"
const jsMinDir = "src/front-end/public/min.js"


const moveJs = () => {
  return src(fromNpm)
    .pipe(dest(jsDir))
}

const jsPath = (files) => {
  return files.map(file => path.resolve(jsDir, file + ".js"))
}

const jsPackages = {
  common: jsPath(jsMap.common),
  home: jsPath(jsMap.home)
}

const jsTasks = Object.keys(jsPackages).map(key => {
  const files = jsPackages[key]
  return () => {
    return src(files)
      .pipe(sourcemaps.init())
      //.pipe(babel(babelConfig))
      .pipe(concat(key + "concat.js"))
      .pipe(uglify())
      .pipe(rename(key + ".min.js"))
      .pipe(sourcemaps.write('./'))
      .pipe(dest(jsMinDir))
  }
})

exports.moveJs = moveJs

exports.default = () => {
  watch(sassFiles, { ignoreInitial: false }, series(sassTask, parallel(...cssTasks)))
  watch(jsFiles, { ignoreInitial: false }, parallel(...jsTasks))
}