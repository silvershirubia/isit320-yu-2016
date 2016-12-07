/**
 * Created by bcuser on 12/7/16.
 */
var express = require('express');
var router = express.Router();

module.exports = (function() {
    'use strict';

    router.get('/database-page', function(request, response) {
        console.log('here');
        response.send({
            'title': 'Prog320-Yu',
            'pageTitle': 'Database Page',
            'description': 'jquery demo'
        });
    });

    return router;
})();
