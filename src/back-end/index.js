import express from "express"
import exphbs from "express-handlebars"
import path from "path"

const app = express()

app.use(express.static(path.resolve(__dirname, "../src/front-end/public")))

app.engine('handlebars', exphbs({
  layoutsDir: path.resolve(__dirname, "../src/front-end/views/layouts"),
  defaultLayout: "main"
}))

app.set('views', path.resolve(__dirname, "../src/front-end/views"))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home', { name: "Hamit" })
})

app.listen(3002, function () {
  console.log('Online at http://localhost:3002')
})