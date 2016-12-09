function views(router, nano, dbName) {
    'use strict';

    function runTemplateView(templateName, request, response) {
        var templater = require('../Library/Templater');
        var nanoDb = nano.db.use(dbName);
        nanoDb.view(request.query.designDoc, request.query.view, function(err,
            body) {
            if (!err) {
                console.log(body);

                var result = [];
                body.rows.forEach(function(doc) {
                    result.push(doc.value);
                    console.log(doc.value);
                });
                var html = templater.template.addNames(templateName, result);
                response.send(html);
            } else {
                console.log(err);
                response.send(500, err);
            }
        });
    }

    router.get('/viewSessions', function(request, response) {

        var nanoDb = nano.db.use(dbName);
        nanoDb.view(request.query.designDoc, request.query.view, function(err, body) {
            if (!err) {
                console.log(body);
                response.send({
                    'name': 'viewSession',
                    docs: body
                });
            } else {
                console.log(err);
                response.status(err.statusCode).send(err);
            }
        });

    });

    router.get('/viewBulk', function(request, response) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.view(request.query.designDoc, request.query.view, function(err, body) {
            if (!err) {
                console.log(body);
                response.send(body);
            } else {
                console.log(err);
                response.status(err.statusCode).send(err);
            }
        });
    });

}

module.exports = views;
