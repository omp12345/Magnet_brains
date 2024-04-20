const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth, isAdmin } = require('../middleware/auth.middleware');

// Route to create a new task
router.post('/tasks', auth, taskController.createTask);

// Route to fetch tasks for the currently logged-in user
router.get('/tasks', auth, taskController.getUserTasks);

// Route to update a task
router.patch('/tasks/:id', auth, taskController.updateTask);
router.delete("/tasks/:id",auth,taskController.deleteTask)



module.exports = router;
