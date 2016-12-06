/**
 * Created by bcuser on 11/14/16.
 */

var express = require('express');
var router = express.Router();

// LOAD PARSEURL:
var parseurl = require('parseurl');

// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?
var session = require('express-session');
var uuid = require('uuid');
var FileStore = require('session-file-store')(session);
var sessionstore = require('sessionstore');
var setServer = require('./set-server');

router.use(function(request, response, next) {
    'use strict';
    console.log('Sample middleware with useful output');
    console.log('request cookies', request.cookies);
    console.log('request secret', request.secret);
    // Uncomment the following line for one run, perhaps.
    // It is too verbose to use everytime
    // console.log(Object.getOwnPropertyNames(request));
    next();
});

/*****************************
 * SessionStore
 *****************************/

var sessionStore = sessionstore.createSessionStore({
    type: 'couchdb',
    host: setServer.serverUrl,
    port: 5984, // optional
    dbName: 'couch-session-yu', // optional
    collectionName: 'sessions', // optional
    timeout: 10000 // optional
});

/***** End Couch Sessions ************************************************/


router.use(session({
    genid: function(req) {
        'use strict';
        console.log('id generated');
        return uuid.v4(); // use UUIDs for session IDs
    },
    key: 'app.sess',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

router.use(function(request, response, next) {
    'use strict';
    var views = request.session.views;

    if (!views) {
        views = request.session.views = {};
    }

    // get the url pathname
    var pathname = parseurl(request).pathname;
    console.log('pathname', pathname);
    console.log('views', views);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

// WHAT DO YOU NEED TO DO HERE TO EXPORT THIS CODE FROM THIS MODULE?
module.exports = router;
