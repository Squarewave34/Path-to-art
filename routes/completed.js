const express = require('express')
const router = express.Router()
const completedController = require('../controllers/completed')

router.get('/', completedController.show)

module.exports = router