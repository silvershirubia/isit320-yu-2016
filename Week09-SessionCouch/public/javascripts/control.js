
$(document).ready(function() {
    'use strict';

    $('#page01').click(function(){showPage('/page01')});
    $('#page02').click(function(){showPage('/page02')});
    $('#page03').click(function(){showPage('/page03')});


    function showPage(pageRoute) {
        // YOUR CODE HERE
        // Be sure to handle the .done .fail and .always chained methods for
        // your call to the server. See the jQuery docs for details.

        $.getJSON(pageRoute, function (data) {
            var info = JSON.stringify(data, null, 4);
            $('#displayArea').html(info);
        }).fail(function(jq, status, error) {
            $('#displayArea').html('error: ' + jq.responseText);
            console.log('error: ', status);
            console.log('error: ', error);
        });
    }

    function showPageViews(pageRoute) {
        console.log(pageRoute);
        $.getJSON('/views' + pageRoute, function (data) {
            var info = JSON.stringify(data, null, 4);
            $('#displayArea').html(info);
        }).fail(function(jq, status, error) {
            $('#displayArea').html('error: ' + jq.responseText);
            console.log('error: ', status);
            console.log('error: ', error);
        });
    }

});



