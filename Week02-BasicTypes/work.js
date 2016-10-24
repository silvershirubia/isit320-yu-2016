var fs = require('fs');

fs.readFile('index.json', 'utf8', function(err, rawJson) {
    'use strict';
    if (err) {
        throw err;
    }

    var json = JSON.parse(rawJson);

    for (var n in json) {
        console.log(n + ' : ' + typeof(json[n]));
    }

});
