const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

const db = 'mongodb://taps:taps123@ds149593.mlab.com:49593/eventsdb';

// Connect to DB
mongoose.connect(db, err => {
    if(err){
        console.log('Error! ' + err);
    } else {
        console.log('Connected to mongodb.');
    }
})

// ========================
// Mock test data

let events = [];
let special = [];

for(let i=1; i<=10; i++){
    events.push({
       "_id": i,
       "name": "Auto Expo " + i,
       "description": "lorem ipsum",
       "date": new Date(),
    });

    special.push({
        "_id": i,
        "name": "Auto Expo " + i,
        "description": "lorem ipsum",
        "date": new Date(),
    });
}


// ========================
// API Routes

// Test get
router.get('/', (req, res) => {
    res.send('Sent from API router');
});

// Registration
router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.error('Error registering ' + error);
        } else {
            res.status(200).send(registeredUser);
        }
    })
});

// Login
router.post('/login', (req, res) => {
    let userData = req.body;

    console.log('Searching for user...')
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.error('Failed to find user! ' + error);
        } else {
            if(!user) {
                console.error('Invalid email trying to login! ' + userData.email);
                res.status(401).send('Invalid credentials');
            } else {
                if(user.password != userData.password){
                    console.error('Invalid password! ' + userData.email);
                    res.status(401).send('Invalid credentials');
                } else {
                    console.info('Successful login: ' + userData.email);
                    res.status(200).send(user);
                }
            }
        }
    });
});

// ====================================
// Mock event APIS

// Event get
router.get('/events', (req, res) => {
    res.json(events);
});

// Special get
router.get('/special', (req, res) => {
    res.json(special);
});

// ===================================

module.exports = router;