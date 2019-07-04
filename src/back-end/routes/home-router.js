import express from 'express'
import scripts from '../../front-end/js-page-map'
import styles from '../../front-end/css-page-map'
import cacheStore from '../util/cache-store'
import { render } from '../util/hbs-loader'

var homeRouter = express.Router()


homeRouter.get('/', async function (req, res) {
  const html = render('home', { script: [...scripts.common, ...scripts.home], style: [...styles.common, ...styles.home] })
  const requestUrl = req.url
  cacheStore[requestUrl] = html
  res.send(html)
})

export default homeRouter