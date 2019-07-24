import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'
import { content, translate } from '../util/content-loader'

const notFound = async function (req, res) {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'not-found',
    viewContent: {
      cssAndJsFiles: ['common', 'not-found'],
      lang,
      title: translate(content.sayfalar['404'], lang, 'baslik')
    },
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export { notFound }