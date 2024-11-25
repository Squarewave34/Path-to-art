const express = require('express')
const router = express.Router()
const completedController = require('../controllers/completed')
const projectController = require('../controllers/projects')

router.get('/', completedController.show)
router.get('/project/:projectId', projectController.showProject)
router.get('/edit/:projectId', projectController.editProject)
router.delete('/delete/:projectId', projectController.deleteProject)
router.put('/submit/:projectId', projectController.submitEditedProject)
router.put('/ongoing/:projectId', projectController.toOngoing)
module.exports = router
