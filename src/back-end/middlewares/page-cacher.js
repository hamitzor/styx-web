import cacheStore from '../util/cache-store'

const pageCacher = () => (req, res, next) => {
  const requestUrl = req.url
  const cachedHtml = cacheStore[requestUrl]

  if (cachedHtml) {
    res.send(cachedHtml)
  }
  else {
    next()
  }
}

export default pageCacher