const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")();
const app = express();
app.use(cors);

const firebaseConfig = {
    apiKey: "AIzaSyBj_XYZQgKH-9YU6fdivTnNHQAySbDhkiw",
    authDomain: "onlinedoctor-beed3.firebaseapp.com",
    projectId: "onlinedoctor-beed3",
    storageBucket: "onlinedoctor-beed3.appspot.com",
    messagingSenderId: "319467208568",
    appId: "1:319467208568:web:3c8b9dd8395a203edcd28d",
    measurementId: "G-ZYYDE8XF2N",
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

app.delete("/doctor/:id", async (req, res) => {
    // Before delete check if document is present in DB
    const doctorsRef = db.collection("doctors").doc(req.params.id);
    const doc = await doctorsRef.get();
    if (!doc.exists) {
        console.log("No such document!");
        res.status(404);
        res.send({ error: "No such document!" });
    }

    //   If present delete doc
    const resp = await db.collection("doctors").doc(req.params.id).delete();
    console.log(resp);
    res.send({ message: "success" });
});
app.put("/doctor/:id", async (req, res) => {
    // Update document using id from path parameter
    const doctorsRef = db.collection("doctors").doc(req.params.id);
    const resp = await doctorsRef.update(req.body);
    console.log(resp);
    res.send({ message: "success" });
});
app.post("/doctor/", async (req, res) => {
    // Create new document in DB
    const docRef = db.collection("doctors").doc();
    const resp = await docRef.set(req.body);
    console.log(resp);
    res.send({ message: "success" });
});
pp.post("/user/", async (req, res) => {
    // Create new document in DB
    const docRef = db.collection("users").doc();
    const resp = await docRef.set(req.body);
    console.log(resp);
    res.send({ message: "success" });
});


app.get("/doctor/:id", async (req, res) => {
    // get data of one document
    const doctorsRef = db.collection("doctors").doc(req.params.id);
    const doc = await doctorsRef.get();
    if (!doc.exists) {
        console.log("No such document!");
        res.status(404);
        res.send({ error: "No such document!" });
    } else {
        console.log("Document data:", doc.data());
        res.send(doc.data());
    }
});
app.get("/doctor/", async (req, res) => {
    // get data of all documents
    const doctors = [];
    const snapshot = await db.collection("doctors").get();
    snapshot.forEach((doc) => {
        const temp = doc.data();
        temp.id = doc.id;
        doctors.push(temp);
    });
    res.send(doctors);
});


exports.app = functions.https.onRequest(app);


