// var nano = require('nano')('http://localhost:5984');
var nano = require('nano')('http://168.156.47.113:5984');

var docName = 'bigNames';
var dbName = 'bc_data';

var readIt = function() {
    'use strict';
    var prog = nano.db.use(dbName);
    prog.get(docName, {
        revs_info: true
    }, function(err, body) {
        if (!err) {
            console.log(body);
        }
    });
};

function insert() {
    'use strict';
    nano.db.create(dbName);
    var prog = nano.db.use(dbName);

    prog.insert({
            'doc': [{
                'firstName': 'Suzie',
                'lastName': 'Higgins'
            }, {
                'firstName': 'Harry',
                'lastName': 'Potter'
            }, {
                'firstName': 'Suz',
                'lastName': 'asdfsdf'
            }]
        },
        docName,
        function(err, body) {
            if (!err) {
                console.log(body);
            }

            readIt();
        });
}

insert();

// readIt();
