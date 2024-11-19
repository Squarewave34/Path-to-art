const express = require('express')
const router = express.Router()
const importantController = require('../controllers/important')

router.get('/', importantController.show)

module.exports = router