/**
 * Created by bcuser on 10/31/16.
 */

define('Score', function(Score) {
    'use strict';

    var readDataBase = function() {
        $.getJSON('/read?docName=npcObjects', function(data) {
            Score.npcData = data.docs;
            console.log(JSON.stringify(data.docs, null, 4));

        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log({
                'Request Failed': err
            });
            var response = JSON.parse(jqxhr.responseText);
            var responseValue = JSON.stringify(response, null, 4);
            console.log(responseValue);
            alert('Database not connected' + responseValue);
        });
    };

    return readDataBase;
});
