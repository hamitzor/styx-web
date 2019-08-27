import express from 'express'
import createProductController from '../controller/product-controller'
import { content } from '../util/content-loader'
import slug from 'slug'

const createProductRouter = () => {
  const productRouter = express.Router({ mergeParams: true })
  Object.keys(content.urunler).forEach(key => {
    const urun = content.urunler[key]
    productRouter.get(`/${slug(urun.isim, { lower: true })}`, createProductController(key))
  })
  return productRouter
}

export default createProductRouter