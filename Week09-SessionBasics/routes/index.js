var express = require('express');
var router = express.Router();

var routeParamMiddleware = function(request, response, next) {
    'use strict';
    console.log('My middleware called by this route:', request.originalUrl);
    next();
};

router.get('/', routeParamMiddleware, function(req, res, next) { 'use strict';
    'use strict';
    res.render('index', { title: 'Week09-SessionBasics' });
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

module.exports = router;
