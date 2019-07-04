import express from 'express'
import cacheStore from '../util/cache-store'
import { render } from '../util/hbs-loader'

var contactRouter = express.Router()


contactRouter.get('/', async function (req, res) {
  const html = render('contact')
  const requestUrl = req.url
  cacheStore[requestUrl] = html
  res.send(html)
})

export default contactRouter