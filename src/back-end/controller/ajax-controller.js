import validator from 'validator'
import { extractFields } from '../util/validation-helpers'
import { strapi, translate, content } from '../util/content-loader'
import delay from 'delay'
import nodemailer from "nodemailer"

const getOffer = async (req, res) => {
  await delay(500)
  const { lang } = req.params
  const {
    ad_soyad,
    eposta,
    tel,
    hizmet,
    mesaj
  } = extractFields(req.body)

  try {
    if (validator.isEmpty(ad_soyad)) { throw ['ad_soyad', 'hata_bos_ad_soyad'] }
    if (validator.isEmpty(eposta)) { throw ['eposta', 'hata_bos_eposta'] }
    if (!validator.isEmail(eposta)) { throw ['eposta', 'hata_gecersiz_eposta'] }
    if (validator.isEmpty(hizmet)) { throw ['hizmet', 'hata_bos_hizmet'] }
    if (!validator.isIn(hizmet, ['Web Tasarım & Yazılım', 'Web Yazılım', 'SEO'])) { throw ['hizmet', 'hata_gecersiz_hizmet'] }
    if (validator.isEmpty(mesaj)) { throw ['mesaj', 'hata_bos_mesaj'] }
    if (!validator.isEmpty(tel) && !validator.matches(tel, /\d\d\d\d\ \d\d\d\ \d\d\ \d\d/)) { throw ['tel', 'hata_gecersiz_tel'] }
  }
  catch (err) {
    res.json({
      status: 'BAD_REQUEST',
      payload: {
        [err[0]]: translate(content.yazilar[err[1]], lang)
      }
    })
    return
  }

  try {
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
    const info = await transporter.sendMail({
      from: `"${ad_soyad}" <${eposta}>`,
      to: translate(content.yazilar.styx_eposta, lang),
      subject: "Teklif İsteği",
      text: `Ad Soyad : ${ad_soyad}\n\nTelefon Numarası : ${tel}\n\nArz Edilen Hizmet : ${hizmet}\n\nMesaj : ${mesaj}`,
      html: `<p><p>Ad Soyad : ${ad_soyad}</p>
      <p>Telefon Numarası : ${tel}</p>
      <p>Arz Edilen Hizmet : ${hizmet}</p>
      <p>Mesaj : ${mesaj}</p></p>`
    })
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

    await strapi.createEntry('teklifs', { ad_soyad, eposta, tel, mesaj, hizmet })
    res.json({
      status: 'OK'
    })
  }
  catch (err) {
    res.json({
      status: 'INTERNAL_SERVER_ERROR'
    })
  }
}

export { getOffer }