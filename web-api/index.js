'use strict'

/*
    This file is the entry point for the server
*/

const
    express = require('express'),
    app = express(),
    path = require('path')

// setup environment variables file
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// Setup app's middleware
require('./app-middleware')(app, express)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on Port: ${process.env.PORT || 3000}`))
