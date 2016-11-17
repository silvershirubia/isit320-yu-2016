var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'NodeRouteBasics' });
});

router.get('/feetToMiles', function(request, response) { 'use strict';
  'use strict';

  var miles = parseInt(request.query.miles) /5280;
  
  response.send({
    result: 'success',
    ok: true,
    milesEntered : miles
  });
});

module.exports = router;
