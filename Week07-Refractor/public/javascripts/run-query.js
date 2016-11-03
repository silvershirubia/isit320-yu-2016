/**
 * Created by bcuser on 11/2/16.
 */
define(function (require) {

    function runQuery(query, $q) {
        'use strict';
        var controller = $q.getController();
        $.getJSON(query, function (json) {
            controller(query, json);
        }).fail(function (jqxhr, textStatus, error) {
            var response = {error: "Unknown. Is program running?"};
            if (jqxhr.responseText) {
                response = JSON.parse(jqxhr.responseText);
                response.genericError = error;
                response.statusText = textStatus;
            }
            queryController({
                'requestFailed': response
            });
        });
    }

    return runQuery;
});