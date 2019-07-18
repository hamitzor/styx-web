import validator from 'validator'
import { extractFields } from '../util/validation-helpers'

const getOffer = (req, res) => {
  const {
    ad_soyad,
    e_posta,
    telefon,
    hizmet,
    mesaj
  } = extractFields(req.body)

  try {
    if (validator.isEmpty(ad_soyad)) { throw Error('Ad Soyad boş olamaz') }
    if (validator.isEmpty(e_posta)) { throw Error('E-Posta boş olamaz') }
    if (!validator.isEmail(e_posta)) { throw Error('Geçersiz E-Posta adresi') }
    if (validator.isEmpty(hizmet)) { throw Error('Hizmet boş olamaz') }
    if (!validator.isIn(hizmet, ['Web Tasarım & Yazılım', 'Web Yazılım', 'SEO'])) { throw Error('Geçersiz hizmet') }
    if (validator.isEmpty(mesaj)) { throw Error('Mesaj boş olamaz') }
    if (!validator.isEmpty(telefon) && !validator.matches(telefon, /\d\d\d\d\ \d\d\d\ \d\d\ \d\d/)) { throw Error('Telefon numarası hatalıdır') }
  }
  catch (err) {
    console.log(err.message)
  }

  console.log(extractFields(req.body))

  setTimeout(() => {
    res.json({
      status: "OK",
      payload: {
        e_posta: "Bu E-posta adresi geçerli değildir"
      }
    })
  }, 500)
}

export { getOffer }