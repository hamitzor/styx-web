import express from 'express'
import homeRouter from './home-router'
import ajaxRouter from './ajax-router'

const router = express.Router({ mergeParams: true })

router.use('/', homeRouter)
router.use('/ajax', ajaxRouter)

export default router