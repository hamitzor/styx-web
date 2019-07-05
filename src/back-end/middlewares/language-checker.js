import { notFound } from '../controller/error-controller'

const languageChecker = (langs) => (req, res, next) => {
  const { lang } = req.params
  if (!langs.includes(lang)) {
    notFound(req, res)
  }
  else {
    next()
  }
}

export default languageChecker