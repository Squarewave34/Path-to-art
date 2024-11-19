const express = require('express')
const router = express.Router()
const waitingController = require('../controllers/waiting')

router.get('/', waitingController.show)
router.get('/new', waitingController.showNewFolder)
router.post('/', waitingController.makeNewFolder)
router.get('/:folderId', waitingController.showFolder)
router.get('/:folderId/edit', waitingController.editFolder)
router.put('/:folderId', waitingController.submitEditedFolder)
router.delete('/:folderId', waitingController.deleteFolder)

module.exports = router