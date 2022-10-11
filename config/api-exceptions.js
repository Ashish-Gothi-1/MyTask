module.exports = {
    user: {
        unknownUser: {
            code: 101,
            msg: "User is not registered."
        },
        alreadyRegistered: {
            code: 102,
            msg: "User already registered."
        },
        wrongPassword: {
            code: 103,
            msg: "Wrong Password"
        },
        invalidToken: {
            code :104,
            msg: "Invalid Token"
        },
        unableToRegister : {
            code : 105,
            msg : "Unable to register"
        }
    },   
    request:{
        serverError: {
            code:2001,
            msg: "There was an error. Please try again."
        },
        invalidRequestData: {
            code: 2002,
            msg: "Invalid request data"
        }
    },
    tasks:{
        notFound:{
            code: 4001,
            msg: "No task found"
        },
        taskDataRequired: {
            code: 4002,
            msg: "Task data is required"
        },
        invalidtaskId:{
            code: 4003,
            msg: "Invalid taskId"
        },
        requiredTaskId:{
            code: 4005,
            msg: "taskId is required"
        },
        invalidParameters:{
            code: 4006,
            msg: "Invalid parameters"
        }
    },
    validation : {
        missingParameters:{
            code: 9001,
            msg: "Missing Parameters"
        },
    }, 
}