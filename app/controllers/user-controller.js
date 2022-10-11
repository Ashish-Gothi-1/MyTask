const userHelper = require('../../core_libs/helpers/auth-helper.js');
const taskApiExceptions = require('../../config/api-exceptions').task;
const apiExceptions = require('../../config/api-exceptions');

module.exports = {
    login :  async (req, res) => {
        try {
            let user = await userHelper.isUserRegistered(req.body.email);
            if(user){
                let isValid = await userHelper.validatePassword(user._id, req.body.password);
                if(isValid){
                    const accessToken = await userHelper.getAccessToken(user._id, req.body.email);

                    return global.sendSuccessResponse(res,false,200,{accessToken});
                }else{
                    return global.sendErrorResponse(res,false,200,apiExceptions.user.wrongPassword.code,apiExceptions.user.wrongPassword.msg);
                }
            }else{
                return global.sendErrorResponse(res,false,200,apiExceptions.user.unknownUser.code,apiExceptions.user.unknownUser.msg);
            }
        }catch(error) {
            console.log(error);
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    },
    register :  async (req, res) => {
        try {
            const isRegistered = await userHelper.isUserRegistered(req.body.email);
            if(isRegistered) {
                return global.sendErrorResponse(res, false, 200, apiExceptions.user.alreadyRegistered.code, apiExceptions.user.alreadyRegistered.msg);
            }
            const registered = await userHelper.register(req.body);
            if(!registered) {
                return global.sendErrorResponse(res, false, 200, apiExceptions.user.unableToRegister.code, apiExceptions.user.unableToRegister.msg);
            }
            return global.sendSuccessResponse(res,false,200,true);
        }catch(error) {
            console.log(error);
            return global.sendErrorResponse(res, false, 200, apiExceptions.request.serverError.code, apiExceptions.request.serverError.msg);
        }
    },
}

