const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/sign-up', authController.showSignUp)
router.post('/sign-up', authController.signUp)

router.get('/sign-in', authController.showSignIn)
router.post('/sign-in', authController.signIn)

router.get('/sign-out', authController.signOut)

module.exports = router