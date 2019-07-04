import Strapi from 'strapi-sdk-javascript'

const strapi = new Strapi('http://localhost:1337')

const content = {}

const normalize = (entities) => {
  return entities.reduce((acc, entitiy) => {
    return { ...acc, [entitiy.key]: entitiy }
  }, {})
}

const normalizeAll = async names => {
  for (const name of names) {
    content[name] = normalize(await strapi.getEntries(name))
  }
}

const loadContent = async () => {
  await normalizeAll(['yazis'])
  return content
}

export { content, loadContent }