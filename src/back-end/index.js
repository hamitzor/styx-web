import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import path from 'path'
import compression from 'compression'
import routes from './routes'
import config from './util/config-loader'
import pageCacher from './middlewares/page-cacher'
import { loadContent } from './util/content-loader'

const index = async () => {

  const app = express()

  app.use(compression())

  await loadContent()

  app.use(pageCacher())

  app.use(express.static(path.resolve(__dirname, '../src/front-end/public')))

  app.use('/:lang/*', (req, res, next) => {
    const { lang } = req.params
    if (lang !== 'en' && lang !== 'tr') {
      res.send('404')
    }
    else {
      next()
    }
  })

  app.use('/:lang/', routes)

  const { hostname, port } = config

  app.listen(port, hostname, function () {
    console.log(`Online at http://${hostname}:${port}`)
  })
}

index()