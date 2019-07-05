import express from 'express'
import path from 'path'
import compression from 'compression'
import routes from './routes'
import config from './util/config-loader'
import pageCacher from './middlewares/page-cacher'
import { loadContent, content } from './util/content-loader'
import { notFound } from './controller/error-controller'
import languageChecker from './middlewares/language-checker'
import { isProduction } from './util/env-checker'

const main = async () => {
  await loadContent()

  const app = express()
  if (isProduction) {
    app.use(compression())
  }
  app.use(express.static(path.resolve(__dirname, '../src/front-end/public')))
  if (isProduction) {
    app.use('/:lang/', pageCacher())
  }
  app.use('/:lang/', languageChecker(Object.keys(content.dils)))
  app.use('/:lang/', routes)
  app.use('*', notFound)

  const { hostname, port } = config
  app.listen(port, hostname, () => console.log(`Online at http://${hostname}:${port}`))
}

export default main