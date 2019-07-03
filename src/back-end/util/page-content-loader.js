import strapi from './strapi-loader'

const pageContent = async (name) => {
  const layoutContent = (await strapi.getEntries(`sayfas?ad=layout`))[0]
  const res = await strapi.getEntries(`sayfas?ad=${name}`)

  if (res.length > 0) {
    return { layoutContent, ...res[0] }
  }

  return { layoutContent }
}

export { pageContent }