const notes = require('express').Router();
const { readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const nts = require('../db/db.json');

//GET route for retriving all the notes

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST routes for a new note

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in adding notes');
    }
});

notes.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const found = nts.some(nts => nts.id === req.params.id);

    if (!found) {
      res.status(400).json({ msg: `No meber whit id of ${req.params.id}` });
    } else {
      nts.filter(nts => nts.id !== req.params.id);
      res.json(nts);
    }
    
});

module.exports = notes;