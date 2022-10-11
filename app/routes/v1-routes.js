const router = require('express').Router();

const userRoutes = require('./auth-routes')
const taskRoutes = require('./task-routes')

const { 
    authorizeAPI
} = require('../middlewares/authorize')

router
    .use('/user', userRoutes)
    .use('/task',authorizeAPI, taskRoutes)

module.exports = router;