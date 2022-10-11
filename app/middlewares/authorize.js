const jwt = require('jsonwebtoken');
const apiExceptions = require('../../config/api-exceptions');
const authorizeAPI = async(req, res, next)=>{
    try{
        let accessToken = req.headers['access-token'];
        if(!accessToken){
            return global.sendErrorResponse(res, false, 401, apiExceptions.user.invalidToken.code, apiExceptions.user.invalidToken.msg);
        }
        jwt.verify(accessToken, "jwt_secret", (err, payload)=>{
            if(err){
                return global.sendErrorResponse(res, false, 401, apiExceptions.user.invalidToken.code, apiExceptions.user.invalidToken.msg);
            }else{
                req.user = payload;
                next();
            }
        })
    }catch(err){
        return global.sendErrorResponse(res, false, 401, apiExceptions.user.invalidToken.code, apiExceptions.user.invalidToken.msg);
    }
}

module.exports ={
    authorizeAPI,
}