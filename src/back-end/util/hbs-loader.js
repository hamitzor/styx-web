import path from 'path'
import fs from 'fs'
import hbs from 'handlebars'
import { content } from './content-loader'
import scripts from '../../front-end/js-page-map'
import stylesheets from '../../front-end/css-page-map'


hbs.registerHelper('trs', (obj, lang, key) => {
  if (!key || typeof key != 'String') {
    key = 'deger'
  }
  if (!lang || lang === 'tr') {
    return obj[key]
  }
  else {
    return obj[`${key}_${lang}`]
  }
})

const getView = view => fs.readFileSync(path.resolve(__dirname, '../src/front-end/views', `${view}.handlebars`), 'utf8')

const renderToHtml = ({ view, viewContent = {}, layout = 'layout' }) => {
  const cssAndJsFiles = viewContent.cssAndJsFiles && viewContent.cssAndJsFiles.reduce((acc, key) => {
    return {
      scripts: [...acc.scripts, ...scripts[key]],
      stylesheets: [...acc.stylesheets, ...stylesheets[key]]
    }
  }, { scripts: [], stylesheets: [] })
  const bodyContent = (hbs.compile(getView(view)))({ ...content, ...viewContent })
  const html = (hbs.compile(getView(layout)))({ ...content, ...viewContent, bodyContent, ...cssAndJsFiles })

  return html
}

export { hbs, renderToHtml }