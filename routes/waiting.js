const express = require('express')
const router = express.Router()
const waitingController = require('../controllers/waiting')

router.get('/', waitingController.show)
router.get('/new', waitingController.showNewFolder)
router.post('/', waitingController.makeNewFolder)
router.get('/:folderId', waitingController.showFolder)

module.exports = router