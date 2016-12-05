/**
 * Created by bcuser on 11/28/16.
 */

var express = require('express');
var router = express.Router();

module.exports = (function() {
    'use strict';

    router.get('/about', function(request, response) {
        console.log('here');
        response.send({
            'title': 'Prog320-Yu',
            'pageTitle': 'About',
            'description': 'jquery demo'
        });
    });

    return router;
})();
