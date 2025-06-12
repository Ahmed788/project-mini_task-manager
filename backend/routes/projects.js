const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/:id/tasks', projectController.getProjectTasks);
router.post('/:id/tasks', projectController.addTaskToProject);

module.exports = router;
