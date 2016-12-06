
var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Session Master II'
    });
});

var pageReport = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('welcome', welcome);
    response.send({
        currentPage: request.url,
        previousPage: previousPage,
        'session': request.session
    });
};

router.get('/page01', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page02', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page03', function(request, response) {
    'use strict';
    pageReport(request, response);
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
