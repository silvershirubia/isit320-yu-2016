/**
 * Created by bcuser on 11/20/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = 'VcQheNHvmEWpHMqxMDWAQSRpv';
var TWITTER_CONSUMER_SECRET = 'VrmpIjjpJN9svnCH3CpzceBZ8TNGiNoJWJB6ptWswHDJiyjXvt';

passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://localhost:30025/twitter/callback'
    },
    function(token, tokenSecret, profile, cb) {
        'use strict';
        //console.log('Twitter strategy callback', profile);
        process.nextTick(function() {
            return cb(null, profile);
        });
    }));

router.get('/login',
    passport.authenticate('twitter'));

router.get('/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        'use strict';
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/profile', function(req, res) {
    'use strict';
    //console.log(req);
    res.render('profile-twitter', {
        title: 'Twitter Profile',
        user: req.user
    });
});

module.exports = router;
