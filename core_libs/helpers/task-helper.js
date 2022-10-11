const TasksModel = require('../models/db-task.js');

const createTask = async (user,taskData) => {
    try {
        const taskCreated = await TasksModel.createTask(user ,taskData);
        return taskCreated;
    }catch(error) {
        throw error;
    }
}
const getTasks = async (userId) => {
    try{
        const tasks = await TasksModel.loadAllByFilters({user_id : userId});
        return tasks;
    }catch(error) {
        throw error;
    }
}
const updateTask = async (taskId, taskInfo) => {
    try{
       const update = await TasksModel.updateTask(taskId, taskInfo); 
       return update;
    }catch(error) {
        throw error;
    }
}
const deleteTask = async (taskId) => {
    try {
        const deleted = await TasksModel.deleteTask(taskId);
        return deleted;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}