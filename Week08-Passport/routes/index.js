var clientId = '766164277407-h3gubp81napgss474nm28hgba207cr0h.apps.googleusercontent.com';
var clientSecret = 'O29ZfAk9NOLHbWdKI9C4_Qb1';

var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(request, response, next) {
    'use strict';
    console.log('Index called');
    response.render('index', {
        title: 'Passport Google'
    });
});

passport.serializeUser(function(user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    'use strict';
    done(null, obj);
});

router.get('/login', function(req, res) {
    'use strict';
    res.render('login', {
        user: req.user
    });
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout();
    response.redirect('/');
});

router.get('/status', function(request, response) {
    'use strict';
    console.log('Status called');
    console.log('Auth: ' + request.isAuthenticated('google'));
    response.send({
        result: 'Success',
        authenticated: request.isAuthenticated()
    });
});

module.exports = router;