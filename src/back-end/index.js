import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import compression from 'compression'
import routes from './routes'
import config from './util/config-loader'

const app = express()

app.use(compression())

app.use(express.static(path.resolve(__dirname, '../src/front-end/public')))

app.engine('handlebars', exphbs({
  layoutsDir: path.resolve(__dirname, '../src/front-end/views/layouts'),
  defaultLayout: 'main'
}))

app.set('views', path.resolve(__dirname, '../src/front-end/views'))

app.set('view engine', 'handlebars')

app.use('/', routes)

const { hostname, port } = config

app.listen(port, hostname, function () {
  console.log(`Online at http://${hostname}:${port}`)
})