// ------------------------------
// User Controller
// ------------------------------

const User = require('../models/User')

async function get (req, res, next) {
  try {
    const users = await User.find({}).lean()
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function show (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean()
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ message: 'No User Found' })
  } catch (error) {
    next(error)
  }
}

async function profile (req, res, next) {
  try {
    const user = await User.findOne({ email: req.user.email }).lean()
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ message: 'No User Found' })
  } catch (error) {
    next(error)
  }
}

async function create (req, res, next) {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    )
    return res.status(200).json(user)
  } catch (error) {
    error.statusCode = 403
    next(error)
  }
}

async function remove (req, res, next) {
  // Remove user
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    res.status(202).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  show,
  profile,
  create,
  update,
  remove,
}
