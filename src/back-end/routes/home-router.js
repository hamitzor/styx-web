import express from 'express'
import { anasayfa, iletisim } from '../controller/home-controller'

const homeRouter = express.Router({ mergeParams: true })

homeRouter.get('/', anasayfa)

homeRouter.get('/iletisim/', iletisim)

export default homeRouter