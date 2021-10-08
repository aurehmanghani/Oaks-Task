const express = require('express');
const router = express.Router();

const TaskController = require('../Controllers/Task.Controller');

//Get a list of all Tasks
router.get('/', TaskController.getAllTasks);

//Create a new task
router.post('/', TaskController.createNewTask);

//Get a task by id
router.get('/:id', TaskController.findTaskById);

//Get a task by Sub id
router.get('/updateStatus/:id/:checked', TaskController.findTaskBySubId);


module.exports = router;
