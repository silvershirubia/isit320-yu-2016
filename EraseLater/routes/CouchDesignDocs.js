/**
 * @name CouchDesignDoc
 */

/* globals emit: true */

function designDocs(router, nano, dbName) {
    'use strict';

    var firstAndLast = function(doc) {
        if (doc.firstName && doc.lastName) {
            var name = doc.firstName + ' ' + doc.lastName;
            emit(doc._id, name);
        }
    };

    var lastOnly = function(doc) {

        if (doc.firstName && doc.lastName) {
            var name = doc.lastName;
            emit(doc._id, name);
        }
    };

    var yuSessions = function(doc) {
        if (doc.type === 'connect-session') {
            emit(doc._id, doc);
        }
    };

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    function createDesignDocument(designDocument, designName, response) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                var result = {
                    'ok': true,
                    data: body
                };
                console.log(result);
                response.status(200).send(result);
            } else {
                console.log('error: ' + error);
                response.send({
                    'Result': 'The document might already exist. ' + error
                });
            }
        });
    }

    router.get('/designDoc', function(request, response) {
        console.log('Design Doc Called');

        var designName = '_design/yu-session';
        var designDocument = {
            'views': {
                'yu-sessions': {
                    'map': yuSessions
                }
            }
        };

        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
