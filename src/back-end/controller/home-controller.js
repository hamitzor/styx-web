import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'
import { content, translate } from '../util/content-loader'


const createHomeController = (name = 'anasayfa', options) => async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: name,
    viewContent: {
      cssAndJsFiles: ['common', name],
      lang,
      title: translate(content.sayfalar[name], lang, 'baslik')
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export default createHomeController