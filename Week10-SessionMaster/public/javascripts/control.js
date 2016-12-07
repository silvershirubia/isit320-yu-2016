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
    $('#designDoc').click(function() {
        showPage('/designDoc');
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

    var control = new Control();

    $('nav li').hover(function(event) {
        setActiveMenuItem(event.currentTarget.id);
    });

    function setActiveMenuItem() {

        $('.nav li').removeClass('active');

        // var menuItem = $('a[href='.' + this.location.pathname + '']');
        var name = location.pathname;
        name = name.slice(1, name.length).trim();
        if (name.length === 0) {
            name = 'home';
        }
        var selector = '#' + name;
        try {
            var menuItem1 = $(selector);
            menuItem1.addClass('active');
        } catch (e) {
            // console.log('Could not find selector. This is expected when testing.', e);
        }
    }

});

var Control = (function() {
    'use strict';

    function Control() {
        console.log('Control constructor called');
        $('#status').click(info);
        $('#back').click(back);
    }

    var back = function() {
        window.location.href = 'http://localhost:30025';
    };

    var info = function() {
        // WRITE AN AJAX OR GET JSON METHOD THAT CALLS THE /info ROUTE AND DISPLAYS THE RESULT
        // THIS SHOULD INCLUDE THE USER INFORMATION SHOWN BELOW IN MY GOOGLE ACCOUNT SCREENSHOT

        $.getJSON('/status', function(result) {
            console.log(result);
            var info = JSON.stringify(result, null, 4);
            $('#report').html(info);
        });
    };

    return Control;
}());
