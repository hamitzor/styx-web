import { loadContent } from '../util/content-loader'

const SECRET = "3376DFA961EDFDF51E293370D298C0CDB8F06C4A15BAA336F2FFD9A10DFF5499"

const watchContentUpdate = () => async (req, res, next) => {
  const { secret } = req.params
  if (secret === SECRET) {
    await loadContent()
    console.log('\x1b[35m', `[${new Date().toLocaleString()}]`, '\x1b[36m', 'Content reloaded', '\x1b[0m')
    res.send("OK")
  }
}

export default watchContentUpdate