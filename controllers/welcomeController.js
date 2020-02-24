// ------------------------------
// Welcome Controller
// ------------------------------

async function get (req, res, next) {
  try {
    return res.status(200).json('Welcome Auth Service API')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
}
