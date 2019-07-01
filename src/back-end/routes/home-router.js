import express from 'express'


var homeRouter = express.Router()

homeRouter.get('/', function (req, res) {
  res.render('home', { title: 'Hoşgeldiniz', script: 'home', style: 'home', grid: [1, 2, 3, 4, 5] })
})

export default homeRouter