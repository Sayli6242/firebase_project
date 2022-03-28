const admin = require('firebase-admin');
// const { getFirestore } = require('firebase-admin/firestore');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


const firebaseConfig = {
    apiKey: "AIzaSyBj_XYZQgKH-9YU6fdivTnNHQAySbDhkiw",
    authDomain: "onlinedoctor-beed3.firebaseapp.com",
    projectId: "onlinedoctor-beed3",
    storageBucket: "onlinedoctor-beed3.appspot.com",
    messagingSenderId: "319467208568",
    appId: "1:319467208568:web:3c8b9dd8395a203edcd28d",
    measurementId: "G-ZYYDE8XF2N"
};

// const admin = firebase.initializeApp(firebaseConfig);
// Add middleware to authenticate requests
// app.use(myMiddleware);
admin.initializeApp(firebaseConfig);

const db = admin.firestore();

// const doctors =

//     [
//         {
//             "Name": "Dr.Mahajan",
//             "city_state": "Motala",
//             "Speciality": "General Physician",
//             "Timing": "8am_to_8pm"
//         },
//         {
//             "Name": "Dr.Batra",
//             "city_state": "Buldhana",
//             "Speciality": "Eye Specialist",
//             "Timing": "8am_to_8pm"
//         }
//     ];

app.delete('/:id', async (req, res) => {
    // console.log(req.params);
    const resp = await db.collection('doctors').doc(req.params.id).delete();
    console.log(resp);
    res.send('delete function')
});
app.put('/:id', (req, res) => res.send('put something'));
app.put('/:id', async (req, res) => {
    // console.log(req.params);
    const resp = await db.collection('doctors').doc(req.params.id).put();
    console.log(resp);
    res.send('update something')
});
app.post('/', async (req, res) => {
    // add data to data base
    const docRef = db.collection('doctors').doc();

    await docRef.set(req.body);

    console.log(req.body);
    res.send('post anything')
});
// app.get('/', (req, res) => res.send(doctors));
app.get('/:id', (req, res) => res.send('get method'));
app.get('/', async (req, res) => {
    const doctors = []
    // doctors.push(doc)
    // GET documents 
    const snapshot = await db.collection('doctors').get();
    snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        const temp = doc.data()
        temp.id = doc.id
        doctors.push(temp)
    });
    // REturn docs as response
    res.send(doctors)
});


// getDocuments()

exports.app = functions.https.onRequest(app);

