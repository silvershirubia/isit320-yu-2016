var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'NodeRouteBasics'
    });
});

router.get('/feetToMiles', function(request, response) {
    'use strict';

    var miles = parseFloat(request.query.feet) / 5280;

    response.send({
        result: 'success',
        ok: true,
        milesEntered: miles
    });
});

router.get('/milesToFeet', function(request, response) {
    'use strict';

    var feet = parseFloat(request.query.miles) * 5280;

    response.send({
        result: 'success',
        ok: true,
        feetEntered: feet
    });
});

module.exports = router;
