
const languageChecker = (langs, defaultLang) => (req, res, next) => {
  const { lang } = req.params
  if (!langs.includes(lang)) {
    res.redirect(`/${defaultLang}${req.originalUrl}`)
  }
  else {
    next()
  }
}

export default languageChecker