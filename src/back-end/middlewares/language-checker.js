
const languageChecker = (langs) => (req, res, next) => {
  const { lang } = req.params
  if (!langs.includes(lang)) {
    res.redirect(`/tr${req.originalUrl}`)
  }
  else {
    next()
  }
}

export default languageChecker