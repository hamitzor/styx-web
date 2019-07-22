import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'

const createProductController = data => async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'urun',
    viewContent: {
      cssAndJsFiles: ['common'],
      lang,
      title: data.isim
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export default createProductController 