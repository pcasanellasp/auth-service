// ------------------------------
// Welcome Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const welcomeController = require('../controllers/welcomeController')

// --------------------
router.get('/', welcomeController.get)

module.exports = router
