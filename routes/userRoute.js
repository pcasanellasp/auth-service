// ------------------------------
// User Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { auth, allow } = require('../middlewares/auth')

// --------------------
router.get('/', auth, allow('admin'), userController.get)
router.get('/profile', auth, userController.profile)
router.get('/:id', auth, allow('admin'), userController.show)
router.post('/', auth, allow('admin'), userController.create)
router.patch('/:id', auth, allow('admin'), userController.update)
router.delete('/:id', auth, allow('admin'), userController.remove)

module.exports = router
