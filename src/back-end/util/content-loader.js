import Strapi from 'strapi-sdk-javascript'

const strapi = new Strapi('http://localhost:1337')

const content = {}

const normalizeEntity = async entityName => {
  const entities = await strapi.getEntries(entityName)
  return normalize(entities)
}

const normalize = entities => {
  return entities.reduce((acc, entity) => {
    return { ...acc, [entity.key || entity.id]: entity }
  }, {})
}

const prepareContent = async () => {
  const sayfalar = await normalizeEntity('sayfas')
  const yazilar = await normalizeEntity('yazis')
  const diller = await normalizeEntity('dils')
  const sliderlar = await normalizeEntity('sliders')
  const formlar = await normalizeEntity('forms')
  const alanlar = await normalizeEntity('alans')
  const urunler = await normalizeEntity('uruns')
  const gorseller = await normalizeEntity('gorsels')
  const referanslar = await normalizeEntity('referans')
  const hizmetler = await normalizeEntity('hizmets')

  content.sayfalar = sayfalar
  content.yazilar = yazilar
  content.diller = diller
  content.sliderlar = sliderlar
  content.formlar = formlar
  content.alanlar = alanlar
  content.urunler = urunler
  content.gorseller = gorseller
  content.referanslar = referanslar
  content.hizmetler = hizmetler
}

const loadContent = async () => {
  await prepareContent()
  return content
}

export { content, loadContent }