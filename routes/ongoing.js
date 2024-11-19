const express = require('express')
const router = express.Router()
const ongoingController = require('../controllers/ongoing')

router.get('/', ongoingController.show)

module.exports = router