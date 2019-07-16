import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'
import loadTitle from '../util/page-title-loader'

const anasayfa = async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'anasayfa',
    viewContent: {
      cssAndJsFiles: ['common', 'anasayfa'],
      lang,
      title: loadTitle('anasayfa', lang)
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

const iletisim = async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'iletisim',
    viewContent: {
      cssAndJsFiles: ['common', 'iletisim'],
      lang,
      title: loadTitle('iletisim', lang)
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export { anasayfa, iletisim }