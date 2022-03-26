const functions = require('firebase-functions');


const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

const doctors =

    [
        {
            "Name": "Dr.Mahajan",
            "city_state": "Motala",
            "Speciality": "General Physician",
            "Timing": "8am_to_8pm"
        },
        {
            "Name": "Dr.Batra",
            "city_state": "Buldhana",
            "Speciality": "Eye Specialist",
            "Timing": "8am_to_8pm"
        }
    ];
app.get('/doctors', (req, res) => res.send(doctors));
app.get('/:id', (req, res) => res.send('get method'));
app.post('/', (req, res) => res.send('post anything'));
app.put('/:id', (req, res) => res.send('put something'));
app.delete('/:id', (req, res) => res.send('delete function'));
app.get('/', (req, res) => res.send('get slash'));


// getDocuments()

exports.app = functions.https.onRequest(app);


