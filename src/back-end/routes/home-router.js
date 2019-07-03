import express from 'express'
import { pageContent } from '../util/page-content-loader'
import scripts from '../../front-end/js-page-map'
import styles from '../../front-end/css-page-map'

var homeRouter = express.Router()

homeRouter.get('/', async function (req, res) {
  const content = await pageContent('anasayfa')
  res.render('home', { ...content, script: [...scripts.common, ...scripts.home], style: [...styles.common, ...styles.home] })
})

export default homeRouter