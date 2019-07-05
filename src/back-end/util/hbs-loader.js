import path from 'path'
import fs from 'fs'
import hbs from 'handlebars'
import { content } from './content-loader'
import scripts from '../../front-end/js-page-map'
import styles from '../../front-end/css-page-map'


hbs.registerHelper('translate', (obj, key, lang) => {
  if (!lang || lang === 'tr') {
    return obj[key]
  }
  else {
    return obj[`${key}_${lang}`]
  }
})

const getView = view => fs.readFileSync(path.resolve(__dirname, '../src/front-end/views', `${view}.handlebars`), 'utf8')

const renderToHtml = ({ view, viewContent = {}, layout = 'layout' }) => {
  const headerFiles = viewContent.headerFiles && viewContent.headerFiles.reduce((acc, key) => {
    return {
      script: [...acc.script, ...scripts[key]],
      style: [...acc.style, ...styles[key]]
    }
  }, { script: [], style: [] })
  const bodyContent = (hbs.compile(getView(view)))({ ...content, ...viewContent })
  const html = (hbs.compile(getView(layout)))({ ...content, ...viewContent, bodyContent, headerFiles })

  return html
}

export { hbs, renderToHtml }