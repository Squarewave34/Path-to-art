const express = require('express')
const router = express.Router()
const ongoingController = require('../controllers/ongoing')
const projectController = require('../controllers/projects')

router.get('/', ongoingController.show)

router.get('/project/:projectId', projectController.showProject)
router.get('/edit/:projectId', projectController.editProject)

router.delete('/delete/:projectId', projectController.deleteProject)
router.put('/submit/:projectId', projectController.submitEditedProject)

module.exports = router
