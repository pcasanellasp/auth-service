// ------------------------------
// Welcome Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { auth } = require('../middlewares/auth')

// --------------------
router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/logout', auth, authController.logout)
router.post('/logoutAll', auth, authController.logoutAll)

module.exports = router
