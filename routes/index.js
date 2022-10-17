const express = require('express');

//import modular rotures for notes
const notesRouter = require('./notes');

const app = express();
app.use('/notes', notesRouter);

module.exports = app;