import express from 'express'
import homeRouter from './home-router'

const router = express.Router({ mergeParams: true })

router.use('/', homeRouter)

export default router