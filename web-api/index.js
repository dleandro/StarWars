'use strict'

/*
    This file is the entry point for the server
*/

const
    express = require('express'),
    app = express(),
    path = require('path'),
    DEFAULT_PORT = 3000

// setup environment variables file
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// Setup app's middleware
require('./app-middleware')(app, express)

app.listen(process.env.WEB_API_PORT || DEFAULT_PORT, () => console.log(`Listening on Port: ${process.env.WEB_API_PORT || DEFAULT_PORT}`))
