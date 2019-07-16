import { content } from '../util/content-loader'

const loadTitle = (pageName, lang) => {
  return content.sayfalar[pageName][`baslik${lang === "tr" ? "" : "_" + lang}`]
}

export default loadTitle