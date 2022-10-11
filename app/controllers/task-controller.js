const taskHelper = require('../../core_libs/helpers/task-helper.js');
const taskApiExceptions = require('../../config/api-exceptions').task;
const apiExceptions = require('../../config/api-exceptions');

module.exports = {
    createTask :  async (req, res) => {
        try {
            console.log("Create Task");
            const taskCreated = await taskHelper.createTask(req.user, req.body);
            return global.sendSuccessResponse(res,false,200,taskCreated);
        }catch(error) {
            console.log(error);
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    },
    updateTask :  async (req, res) => {
        try {

        }catch(error) {
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    },
    deleteTask : async (req, res) => {
        try {
            
        }catch(error) {
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    },
    getTasks :  async (req, res) => {
        try{

        }catch(error) {
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    }
}

