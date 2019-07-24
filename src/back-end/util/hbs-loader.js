import path from 'path'
import fs from 'fs'
import hbs from 'handlebars'
import { content, translate } from './content-loader'
import scripts from '../../front-end/js-page-map'
import stylesheets from '../../front-end/css-page-map'
import config from '../util/config-loader'
import showdown from 'showdown'

const cmsRoot = `${config.cms_port === 443 ? "https" : "http"}://${config.cms_hostname}:${config.cms_port}`

hbs.registerHelper('img', function (obj, lang, key) {
  if (!obj) {
    return '';
  }
  if (!key || typeof key != 'string') {
    key = 'gorseller'
  }
  if (!lang || lang === 'tr') {
    let img = obj[key]
    if (Array.isArray(img)) {
      img = obj[key][0]
    }
    return img.url
  }
  else {
    let img = obj[`${key}_${lang}`]
    if (Array.isArray(img)) {
      img = obj[`${key}_${lang}`][0]
    }
    return img.url
  }
})

hbs.registerHelper('cmsRoot', function () {
  return cmsRoot
})

hbs.registerHelper('eq', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
})

hbs.registerHelper('notEq', function (a, b, options) {
  if (a !== b) {
    return options.fn(this);
  }
  return options.inverse(this);
})

hbs.registerHelper('trs', (obj, lang, key) => {
  if (!key || typeof key != 'string') {
    key = 'deger'
  }
  return translate(obj, lang, key)
})

hbs.registerHelper('markdown', function (text) {
  const imgRegex = /\!\[[^\[\]]*\]\(([^\(\)]*)\)/g
  let matches = null
  do {
    matches = imgRegex.exec(text)
    if (matches) {
      text = text.replace(matches[1], `${cmsRoot}${matches[1]}`)
    }

  } while (matches)

  const converter = new showdown.Converter()
  const html = converter.makeHtml(text)
  return html
})

const getView = view => fs.readFileSync(path.resolve(__dirname, '../src/front-end/views', `${view}.handlebars`), 'utf8')

const renderToHtml = ({ view, viewContent = {}, layout = 'layout' }) => {

  const cssAndJsFiles = viewContent.cssAndJsFiles && viewContent.cssAndJsFiles.reduce((acc, key) => {
    return {
      scripts: [...acc.scripts, ...(scripts[key].map(script => /^\{\{.*\}\}$/.test(script) ? script.replace('{{', '').replace('}}', '') : ` src=${script} `))],
      stylesheets: [...acc.stylesheets, ...stylesheets[key]]
    }
  }, { scripts: [], stylesheets: [] })
  const bodyContent = (hbs.compile(getView(view)))({ ...content, ...viewContent })
  const html = (hbs.compile(getView(layout)))({ ...content, ...viewContent, bodyContent, ...cssAndJsFiles })

  return html
}

export { hbs, renderToHtml }