import { cachePage } from '../util/cache-store'
import { renderToHtml } from '../util/hbs-loader'
import { content, translate } from '../util/content-loader'


const anasayfa = async (req, res) => {
  const { lang } = req.params
  const html = renderToHtml({
    view: 'anasayfa',
    viewContent: {
      cssAndJsFiles: ['common', 'anasayfa'],
      lang,
      title: translate(content.sayfalar.anasayfa, lang, 'baslik')
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
      title: translate(content.sayfalar.iletisim, lang, 'baslik')
    }
  })
  cachePage(req.originalUrl, html)
  res.send(html)
}

export { anasayfa, iletisim }