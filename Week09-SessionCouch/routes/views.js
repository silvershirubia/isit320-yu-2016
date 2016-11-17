/**
 * Created by bcuser on 11/14/16.
 */
var express = require('express');
var router = express.Router();

// WRITE IT THIS WAY SO WE ONLY NEED TO INCLUDE ONE 'use strict'; STATEMENT
module.exports = (function() {
    'use strict';

    router.get('/page01', function(request, response, next) {
        response.send({result: 'you viewed this page ' + request.session.views['/views/page01'] + ' times'});
    });

    router.get('/page02', function(request, response, next) {
        response.send({result:'you viewed this page ' + request.session.views['/views/page02'] + ' times'});
    });

    router.get('/page03', function(request, response, next) {
        response.send({result:'you viewed this page ' + request.session.views['/views/page03'] + ' times'});
    });

    return router;
})();