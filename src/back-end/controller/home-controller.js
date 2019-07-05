import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'

const anasayfa = async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'anasayfa',
    viewContent: { headerFiles: ['common', 'anasayfa'], lang }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

const iletisim = async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'iletisim',
    viewContent: { headerFiles: ['common', 'iletisim'], lang }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export { anasayfa, iletisim }