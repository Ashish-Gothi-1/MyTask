
const UserModel = require('../models/db-users')

const jwt = require('jsonwebtoken')
   

const getAccessToken = async (userId,email) => {
    try{
        const accessToken = jwt.sign({
            userId,
            email
        },"jwt_secret");
        return accessToken;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

const register = async (userInfo) => {
    try{
        let user = await UserModel.createUser(userInfo);
        return user;
    }catch(error) {
        throw error;
    }
}
const isUserRegistered = async (email) => {
    try{
        let user = await UserModel.findOne({
            email
        });
        return user ? user : false;
    }catch(error) {
        throw error;
    }
}

const verifyJwt = (token)=>{
    try{
        const payload = jwt.verify(token, "jwt_secret");
        return payload;
    }catch(err){
        return false;
    }
}

const validatePassword = async (userId, password) => {
    try{
        const isValid = await UserModel.validatePassword({_id : userId},password);
        console.log(isValid);
        return isValid;
    }catch(error) {
        console.log(error);
        return false;
    }
}

module.exports ={
    register,
    verifyJwt,
    isUserRegistered,
    validatePassword,
    getAccessToken
}