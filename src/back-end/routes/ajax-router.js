import express from 'express'
import { getOffer } from '../controller/ajax-controller'
import bodyParser from 'body-parser'

const ajaxRouter = express.Router({ mergeParams: true })

ajaxRouter.post('/teklif-al', [bodyParser.json()], getOffer)

export default ajaxRouter