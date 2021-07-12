const
    morgan = require('morgan'),
    apiUtils = require('./util/api-utils'),
    endpoints = require('./web-api-endpoints'),
    cors = require('cors');


// This module is used to setup middleware on the app passed as a parameter
module.exports = async function (app) {

    const corsOptions = {
        origin: ['http://localhost:3000/'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
        credentials: true,
    };

    // app configurations
    app.use(cors(corsOptions));

    // For request logging
    app.use(morgan('tiny'));

    app.use('/starwars/v1', endpoints);

    // error handler
    app.use((err, req, res, next) => {
        console.log(err);
        apiUtils.setResponse(res, { err: err.message }, err.status || 400);
    });

}