const cacheStore = {}

const cachePage = (url, html) => {
  cacheStore[url] = html
}

const getCachedPage = url => cacheStore[url]

export { cachePage, getCachedPage }