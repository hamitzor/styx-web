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
import createProductRouter from './routes/product-router'
import noBots from 'express-nobots'

const main = async () => {

  await loadContent()

  const app = express()

  app.use(noBots())

  if (isProduction) {
    app.use(compression())
  }
  app.use('/public', express.static(path.resolve(__dirname, '../src/front-end/public')))
  app.use(/\//, (req, res) => {
    res.redirect('/tr/')
  })
  if (isProduction) {
    app.use('/:lang/', pageCacher())
  }
  app.use('/:lang/', languageChecker(Object.keys(content.diller), 'tr'))
  app.use('/:lang/', routes)
  app.use('/:lang/urunler', createProductRouter())
  app.use('/:lang/*', notFound)

  const { port } = config
  app.listen(port, () => console.log(`Online at http://localhost:${port}`))
}

export default main