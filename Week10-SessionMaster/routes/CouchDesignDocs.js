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

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    var docNpcSecurity = function(doc) {
        emit(doc.id, {
            'npc_id': doc.npc_id,
            'npc_name': doc.npc_name,
            'question': doc.question,
            'answer': doc.answer
        });
    };

    var docNpcObjects = function(doc) {
        if (doc._id === 'npcObjects') {
            var data = [];
            doc.docs.forEach(function(npc) {
                data.push({
                    'npc_id': npc.npc_id,
                    'npc_name': npc.npc_name,
                    'value': npc.value
                });
            });
            emit(doc.docs[0].id, data);
        }
    };

    var elfSessionStore = function(doc) {
        // if the doc **collectionName** property equals **'sessions'** then emit the **doc._id** and the **doc** itself.
    };

    var elfSessionExpires = function (doc) {
        // if the doc **collectionName** property equals **'sessions'** and **doc.expires exists** then emit the **doc.expires**.
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

        var designName = '_design/npcs';
        var designDocument = {
            'views': {
                'docBulk': {
                    'map': docBulk
                },
                'docIdDoc': {
                    'map': docIdDoc
                },
                'docNpcSecurity': {
                    'map': docNpcSecurity
                },
                'docNpcObjects': {
                    'map': docNpcObjects
                }
                /*,
                                "viewStatesDoc" : {
                                    "map" : viewStatesDoc
                                },
                                "docStatesHtml" : {
                                    "map" : docStatesHtml
                                }*/
            }
        };

        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
