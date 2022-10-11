const mongoose = require('../utils/database-connection').Mongoose;
const errorCodes = require('../../config/error-codes').user;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        },
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

UsersSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UsersSchema.methods.comparePassword = function (candidatePassword) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return false;
        return isMatch;
    });
};

UsersSchema.methods.getPublicObject = function () {

    return {
        id: this._id,
        name: this.name,
        email: this.email,
        createdAt : this.createdAt
    }
};

// create new user in user collection
UsersSchema.statics.createUser = async function (userInfo) {
    try {
        const user = new UsersModel(userInfo);

        const userCreated = await user.save();
        return (userCreated ? userCreated.getPublicObject() : null);

    } catch (err) {
        var errorData = [];
        for (item in err.errors) {
            errorData.push({
                field: err.errors[item].path,
                message: err.errors[item].message
            });                
        }
        error = {
            code: errorCodes.validationFailed,
            message: 'Validation Failed',
            errorData:errorData
        }; 
        throw error;
    }
};

UsersSchema.statics.loadAllByFilters = async function (filters = {}, ordering, offset, limit) {

    let userQ = this.find(filters);

    if (ordering) {
        userQ.sort(ordering);
    }

    if (offset) {
        userQ.skip(offset);
    }

    if (limit) {
        userQ.limit(limit);
    }

    const Users = await userQ;
    let allUsers = [];

    if(Users.length && Users.length > 0){
        Users.forEach(function(userDetails) {
            let userObject = userDetails.getPublicObject();
            allUsers.push(userObject);
        })
        
    }
    return allUsers;
};

UsersSchema.statics.updatePassword = async function (filters = {}, password) {
    try {
        const user = await this.findOne(filters);
        user.password = password;
        const result = await user.save();
        return result? true:false;

    } catch (error) {
        throw error;
    }
};

UsersSchema.statics.validatePassword = async function (filters = {}, password) {
    try {
        const user = await this.findOne(filters);
        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword;
    } catch (error) {
        throw error;
    }
};

module.exports = UsersModel = mongoose.model('Users', UsersSchema);