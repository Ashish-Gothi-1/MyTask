const jwt = require('jsonwebtoken');

const authorizeAPI = async(req, res, next)=>{
    try{
        let accessToken = req.headers['access-token'];
        console.log("AccessToken",accessToken);
        if(!accessToken){
            return res.status(401).json({
                err: "Unauthorized"
            });
        }
        jwt.verify(accessToken, "jwt_secret", (err, payload)=>{
            if(err){
                return res.status(401).json({
                    err: "Invalid JWT Token"
                });
            }else{
                req.user = payload;
                next();
            }
        })
    }catch(err){
        return res.status(401).json({
                err: "You are not allowed to use this API"
            });
    }
}

module.exports ={
    authorizeAPI,
}