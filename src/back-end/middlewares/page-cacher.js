import { getCachedPage } from '../util/cache-store'

const pageCacher = () => (req, res, next) => {
  const cachedHtml = getCachedPage(req.originalUrl)
  if (cachedHtml) {
    res.send(cachedHtml)
  }
  else {
    next()
  }
}

export default pageCacher