const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

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

//detels saved noted
notes.delete('/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json'));
    let noteToBeDeleted = db.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteToBeDeleted));
    res.json(noteToBeDeleted);
    
});

module.exports = notes;