import { loadContent } from '../util/content-loader'

const SECRET = "3376DFA961EDFDF51E293370D298C0CDB8F06C4A15BAA336F2FFD9A10DFF5499"

const watchContentUpdate = () => async (req, res, next) => {
  const { secret } = req.params
  if (secret === SECRET) {
    console.log(`[${new Date()}] Reloading content`)
    await loadContent()
    res.send("OK")
  }
}

export default watchContentUpdate