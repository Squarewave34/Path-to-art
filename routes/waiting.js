const express = require('express')
const router = express.Router()
const waitingController = require('../controllers/waiting')

router.get('/', waitingController.show)

module.exports = router