const express = require('express')
const router = express.Router()
const ongoingController = require('../controllers/ongoing')
const projectController = require('../controllers/projects')

router.get('/', ongoingController.show)

router.get('/project/:projectId', projectController.showProject)
router.get('/edit/:projectId', projectController.editProject)

router.delete('/delete/:projectId', projectController.deleteProject)
router.put('/submit/:projectId', projectController.submitEditedProject)

router.put('/completed/:projectId', projectController.toCompleted)
router.put('/waiting/:projectId', projectController.toWaiting)
router.put('/important/:projectId', projectController.important)

module.exports = router
