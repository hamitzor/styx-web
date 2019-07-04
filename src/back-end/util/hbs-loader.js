import path from 'path'
import fs from 'fs'
import hbs from 'handlebars'
import { content } from './content-loader'


const getView = view => fs.readFileSync(path.resolve(__dirname, '../src/front-end/views', `${view}.handlebars`), 'utf8')

const render = (view, viewContent) => {

  const bodyContent = (hbs.compile(getView(view)))({ ...content, ...viewContent })
  const html = (hbs.compile(getView('layout')))({ ...content, ...viewContent, bodyContent })

  return html
}

export { hbs, render }