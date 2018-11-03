const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized  request.');
    }
    let token = req.headers.authorization.split(' ')[1];

    if(!token || token === 'null'){
        return res.status(401).send('Unauthorized  request.');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
        return res.status(401).send('Unauthorized  request.');
    }

    validateUser(payload.subject);
    req.userId = payload.subject;

    // console.log('Passed token: ' + payload.subject);
    next();
}

function validateUser(userId) {
    console.log('Trying to validate user. @uid=' + userId);

    User.findOne({"_id": userId}, (error, user) => {
        if(error){
            console.error('Failed to find user! ' + error);
            return false;
        } else {
            if(!user) {
                console.error('Invalid userId! ' + userId);
                return false;
            } else {
                console.error('Valid userId! @userId=' + userId + " @email=" + user.email);
                return true;
            }
        }
    });
}

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

router.get('/user', (req, res) => {
    res.send('Sent from API router');
});

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
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');

            res.status(200).send({token});
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
                console.error('Invalid email trying to loginUser! ' + userData.email);
                res.status(401).send('Invalid credentials');
            } else {
                if(user.password != userData.password){
                    console.error('Invalid password! ' + userData.email);
                    res.status(401).send('Invalid credentials');
                } else {
                    console.info('Successful login: ' + userData.email);

                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');

                    res.status(200).send({token});
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
router.get('/special',verifyToken, (req, res) => {
    res.json(special);
});

// ===================================

module.exports = router;