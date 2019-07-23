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

const main = async () => {

  await loadContent()
  if (!isProduction) {
    setInterval(async () => {
      await loadContent()
    }, 4000)
  }

  const app = express()
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

  const { hostname, port } = config
  app.listen(port, hostname, () => console.log(`Online at http://${hostname}:${port}`))
}

export default main