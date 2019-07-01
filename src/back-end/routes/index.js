import express from 'express'
import homeRouter from './home-router'

var router = express.Router()

router.use('/', homeRouter)

export default router