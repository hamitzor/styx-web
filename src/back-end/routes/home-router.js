import express from 'express'
import createHomeController from '../controller/home-controller'

const homeRouter = express.Router({ mergeParams: true })

const pages = ['', 'iletisim', 'kurumsal', 'referanslar', 'teklif-al']

pages.forEach(name => {
  homeRouter.get(`/${name}`, createHomeController(name ? name : undefined))
})

export default homeRouter