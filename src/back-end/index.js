import express from "express"
import exphbs from "express-handlebars"
import path from "path"
import compression from "compression"

const app = express()

app.use(compression())

app.use(express.static(path.resolve(__dirname, "../src/front-end/public")))

app.engine('handlebars', exphbs({
  layoutsDir: path.resolve(__dirname, "../src/front-end/views/layouts"),
  defaultLayout: "main"
}))

app.set('views', path.resolve(__dirname, "../src/front-end/views"))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home', { title: "Hamit", script: "home", style: "home" })
})

app.listen(3002, function () {
  console.log('Online at http://localhost:3002')
})