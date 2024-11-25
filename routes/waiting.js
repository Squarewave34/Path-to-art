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
router.get('/show/:folderId/project/:projectId', projectController.showProject)
router.get('/edit/:folderId/project/:projectId', projectController.editProject)
router.put('/submit/:folderId/:projectId', projectController.submitEditedProject)
router.delete('/delete/:folderId/project/:projectId', projectController.deleteProject)

router.put('/ongoing/:folderId/project/:projectId', projectController.toOngoing)
router.put('/completed/:projectId', projectController.toCompleted)
router.put('/important/:projectId', projectController.important)


module.exports = router