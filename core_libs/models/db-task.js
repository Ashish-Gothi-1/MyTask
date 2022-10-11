const mongoose = require('../utils/database-connection').Mongoose;
const moment = require('moment')


const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    due_date: {
        type: Date
    },
    attachment: {
        type: String
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    }
}, {
    timestamps: true
})

tasksSchema.statics.loadAllByFilters = async function (filters = {}, ordering, offset, limit) {

    let tasksQ = this.find(filters);

    if (ordering) {
        tasksQ.sort(ordering);
    }

    if (offset) {
        tasksQ.skip(offset);
    }

    if (limit) {
        tasksQ.limit(limit);
    }
    const tasks = await tasksQ;
    let tasksList = [];

    if (tasks.length && tasks.length > 0) {
        tasks.forEach(function (taskDetails) {
            tasksList.push(taskDetails);
        })

    }

    const count = await this.count(filters)
    return {
        tasksList,
        count
    };
};

tasksSchema.statics.createTask = async function (user, taskInfo) {
    try {
        console.log("TaskInfo",taskInfo);
        const task = new this({
            ...taskInfo,
            user_id : user.userId   
        });

        await task.save();

        return task._id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

tasksSchema.statics.updateTask = async function (taskId, taskInfo) {
    try {
        const update = await this.findOneAndUpdate({
            _id : taskId
        },taskInfo);
        return update ? true : false;
    } catch (err) {
        return false;
    }
}

tasksSchema.statics.deleteTask = async function (taskId) {
    try {
        const deleted  = await this.deleteOne({
            _id : taskId
        });
        return deleted ? true : false;
    } catch (err) {
        return false;
    }
}

module.exports = mongoose.model('tasks', tasksSchema);