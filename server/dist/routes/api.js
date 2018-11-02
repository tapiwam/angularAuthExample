'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var EventData = require('../models/eventData');

var db = 'mongodb://taps:taps123@ds149593.mlab.com:49593/eventsdb';
var data = new EventData();

// Connect to DB
mongoose.connect(db, function (err) {
    if (err) {
        console.log('Error! ' + err);
    } else {
        console.log('Connected to mongodb.');
    }
});

// ========================
// API Routes

// Test get
router.get('/', function (req, res) {
    res.send('Sent from API router');
});

// Registration
router.post('/register', function (req, res) {
    var userData = req.body;
    var user = new User(userData);
    user.save(function (error, registeredUser) {
        if (error) {
            console.error('Error registering ' + error);
        } else {
            res.status(200).send(registeredUser);
        }
    });
});

// Login
router.post('/login', function (req, res) {
    var userData = req.body;

    console.log('Searching for user...');
    User.findOne({ email: userData.email }, function (error, user) {
        if (error) {
            console.error('Failed to find user! ' + error);
        } else {
            if (!user) {
                console.error('Invalid email trying to login! ' + userData.email);
                res.status(401).send('Invalid credentials');
            } else {
                if (user.password != userData.password) {
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

router.get('/events', function (req, res) {
    res.json(data.events);
});

router.get('/special', function (req, res) {
    res.json(data.special);
});

module.exports = router;