const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const {
    sendSuccessResponse,
    sendErrorResponse
} = require('../../core_libs/utils/responses');

const loadLogger = (app) => {
    app.use(morgan((tokens, req, res) => {
        return [
            "Access ",
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
    }));
}
const loadRequestParsers = (app) => {
    app.use(cookieParser());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json({limit: "5mb"}));
}
const loadStaticFileServe = (app) => {
    app.use(express.static(path.join(__dirname, '../static')));
}
const createGlobals = () => {
    global.sendSuccessResponse = sendSuccessResponse;
    global.sendErrorResponse = sendErrorResponse;
}

module.exports = {
    loadLogger,
    loadRequestParsers,
    loadStaticFileServe,
    createGlobals
}