import express from 'express'
import homeRouter from './home-router'
import contactRouter from './contact-router'

var router = express.Router()

router.use('/', homeRouter)
router.use('/contact/', contactRouter)

export default router