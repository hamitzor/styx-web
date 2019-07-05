import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'

const notFound = async function (req, res) {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'not-found',
    viewContent: { headerFiles: ['common', 'error'], lang }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export { notFound }