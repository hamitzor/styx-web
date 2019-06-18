import express from "express"


var homeRouter = express.Router()

homeRouter.get('/', function (req, res) {
  res.render('home', { title: "Hoşgeldiniz", script: "home", style: "home" })
})

export default homeRouter