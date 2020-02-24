// ------------------------------
// Auth Middleware
// ------------------------------

const User = require('../models/User')
const jwt = require('jsonwebtoken')

function allow (roles = 'guest') {
  const roleList = Array.isArray(roles) ? roles : [roles]

  return async function (req, res, next) {
    try {
      const userRoles = req.user.roles

      if (userRoles.includes('admin')) {
        return next()
      }

      for (const role of roleList) {
        if (userRoles.includes(role)) {
          return next()
        }
      }

      throw new ApiError(401, 'Not authorized')
    } catch (error) {
      return next(error)
    }
  }
}

function deny (roles = 'guest') {
  const roleList = Array.isArray(roles) ? roles : [roles]

  return async function (req, res, next) {
    try {
      const userRoles = req.user.roles

      for (const role of roleList) {
        if (userRoles.includes(role)) {
          throw new ApiError(401, 'Not authorized')
        }
      }

      return next()
    } catch (error) {
      return next(error)
    }
  }
}

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}

module.exports = {
  allow,
  deny,
  auth,
}
