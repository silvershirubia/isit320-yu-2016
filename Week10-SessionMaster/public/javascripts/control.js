$(document).ready(function() {
    'use strict';

    $('#page01').click(function() {
        showPage('/page01');
    });
    $('#page02').click(function() {
        showPage('/page02');
    });
    $('#page03').click(function() {
        showPage('/page03');
    });

    $('#viewPage01').click(function() {
        showPage('/views/page01');
    });
    $('#viewPage02').click(function() {
        showPage('/views/page02');
    });
    $('#viewPage03').click(function() {
        showPage('/views/page03');
    });

    $('#fileStore').click(function() {
        showPage('/views/file-store');
    });
    $('#request').click(function() {
        showPage('/views/request');
    });
    $('#session').click(function() {
        showPage('/views/session-status');
    });
    $('#sessionView').click(function() {
        //showPage('/Couch/viewSessions');
        showPage('/viewSessions?designDoc=elf-session&view=elf-sessions');
    });

    function showPage(pageRoute) {
        // YOUR CODE HERE
        // Be sure to handle the .done .fail and .always chained methods for
        // your call to the server. See the jQuery docs for details.

        $.getJSON(pageRoute, function(data) {
            var info = JSON.stringify(data, null, 4);
            $('#displayArea').html(info);
        }).fail(function(jq, status, error) {
            $('#displayArea').html('error: ' + jq.responseText);
            console.log('error: ', status);
            console.log('error: ', error);
        });
    }

});
