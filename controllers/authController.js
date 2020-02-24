// ------------------------------
// Auth Controller
// ------------------------------

const User = require('../models/User')

async function login (req, res, next) {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    next(error)
  }
}

async function register (req, res, next) {
  // Register a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (error) {
    next(error)
  }
}

async function logout (req, res, next) {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    next(error)
  }
}

async function logoutAll (req, res, next) {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  register,
  logout,
  logoutAll,
}
