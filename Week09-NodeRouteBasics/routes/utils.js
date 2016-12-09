/**
 * Created by bcuser on 11/20/16.
 */
var express = require('express');
var router = express.Router();

module.exports = (function() {
    'use strict';

    // YOUR METHOD HERE
    router.get('/radiusToCircumference', function(request, response) {

        console.log('here');
        var cir = parseFloat(request.query.radius) * 2 * Math.PI;

        response.send({
            result: 'success',
            ok: true,
            circumferenceEntered: cir
        });
    });

    return router;
})();
