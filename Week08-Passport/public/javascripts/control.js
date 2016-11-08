/**
 * Control.js
 */

var Control = (function() {
    'use strict';

    function Control() {
        console.log("Control constructor called");
        $("#status").click(info);
    }

    var info = function() {
        // WRITE AN AJAX OR GET JSON METHOD THAT CALLS THE /info ROUTE AND DISPLAYS THE RESULT
        // THIS SHOULD INCLUDE THE USER INFORMATION SHOWN BELOW IN MY GOOGLE ACCOUNT SCREENSHOT

        $.getJSON('/status', function (result) {
            console.log(result);
            var info = JSON.stringify(result, null, 4);
            $('#report').html(info);
        });
    };

    return Control;

}());

$(document).ready(function() {
    'use strict';
    var control = new Control();
});