const { watch, src, dest } = require("gulp")
const sass = require("gulp-sass")

const sassFiles = ["node_modules/bootstrap/scss/bootstrap.scss", "src/front-end/scss/*.scss"]
const jsFiles = [
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/popper.js/dist/umd/popper.min.js"
]

const sassTask = () => {
  return src(sassFiles)
    .pipe(sass())
    .pipe(dest("src/front-end/public/css"))
}

const jsTask = () => {
  return src(jsFiles)
    .pipe(dest("src/front-end/public/min.js"))
}

exports.default = function () {
  watch(sassFiles, { ignoreInitial: false }, sassTask)
  watch(jsFiles, { ignoreInitial: false }, jsTask)
}