import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'
import { content } from '../util/content-loader'

const createProductController = key => async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'urun',
    viewContent: {
      urun: content.urunler[key],
      cssAndJsFiles: ['common'],
      lang,
      title: content.urunler[key].isim
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export default createProductController 