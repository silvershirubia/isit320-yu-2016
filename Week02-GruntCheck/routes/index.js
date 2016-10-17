var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Week02-GruntCheck'
    });
});

router.get('/getIndex', function(req, res, next) {
    'use strict';

    fs.readFile('index.json', 'utf8', function(err, rawJson) {
        if (err) {
            throw err;
        }

        var json = JSON.parse(rawJson);
        res.send(json);

    });

});

module.exports = router;
