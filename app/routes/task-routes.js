const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');



router
    .post('/create',taskController.createTask)
    .post('/update/:taskId',taskController.updateTask)
    .delete('/delete/:taskId',taskController.deleteTask)
    .get('/get-tasks',taskController.getTasks)


module.exports = router;