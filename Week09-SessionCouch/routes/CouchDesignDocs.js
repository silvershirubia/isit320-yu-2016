/**
 * @name CouchDesignDoc
 */

/* globals emit: true */

function designDocs(router, nano, dbName) {
    'use strict';

    var elfSessions = function(doc) {
        if (doc.type === 'connect-session') {
            emit(doc._id, doc);
        }
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

        var designName = '_design/elf-session';
        var designDocument = {
            'views': {
                'elf-sessions': {
                    'map': elfSessions
                }
            }
        };

        createDesignDocument(designDocument, designName, response);
    });
}

module.exports = designDocs;
