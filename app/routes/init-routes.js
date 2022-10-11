const v1Routes = require('./v1-routes')

const initRoutes = (app)=>{
    app
        .use('/v1', v1Routes)
}

module.exports = initRoutes;