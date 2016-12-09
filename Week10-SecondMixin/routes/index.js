var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        id: request.params.id,
        pageTitle: request.params.id
    });
});

router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        pageTitle: 'Main Page',
        programTitle: 'Week05-JadeMixinBasics'
    });
});

router.get('/foo', function(request, response) {
    'use strict';
    console.log(request.query);
    response.send(request.query);
});

module.exports = router;
