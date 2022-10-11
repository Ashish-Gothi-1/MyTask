const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const config = require("../config/.env");
const appConfig = require('../config/.env').apps.task_manager;
const taskRoutes = require('./routes/task-routes.js');
const initRoutes = require('./routes/init-routes.js');
const {
  loadLogger,
  loadRequestParsers,
  createGlobals,
  loadStaticFileServe,
} = require('./scripts/init-server');

loadLogger(app);
loadRequestParsers(app);
createGlobals(app);
loadStaticFileServe(app);

app.use(
  cookieSession({
    name: config.session.name,
    maxAge: config.session.ttl,
    keys: [config.session.key],
  })
);




const port = process.env.PORT || appConfig.port;



app.use(morgan('dev'));
initRoutes(app);

app.listen(port, ()=> {
    console.log(`Task Manager Server is ready and listening on port : ${port}`);
});