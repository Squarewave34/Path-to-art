const express = require('express')
const router = express.Router()
const waitingController = require('../controllers/waiting')
const projectController = require('../controllers/projects')

router.get('/', waitingController.show)
router.get('/new', waitingController.showNewFolder)
router.post('/', waitingController.makeNewFolder)
router.get('/:folderId', waitingController.showFolder)
router.get('/:folderId/edit', waitingController.editFolder)
router.put('/:folderId', waitingController.submitEditedFolder)
router.delete('/:folderId', waitingController.deleteFolder)

router.get('/:folderId/projects/new', projectController.newProject)
router.post('/:folderId/projects', projectController.makeNewProject)
router.get('/:folderId/project/:projectId', projectController.showProject)
router.get('/:folderId/project/:projectId/edit', projectController.editProject)
router.put('/project/:projectId', projectController.submitEditedProject)
router.delete('/:folderId/project/:projectId', projectController.deleteProject)

module.exports = router