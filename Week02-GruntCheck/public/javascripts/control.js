$(document).ready(function() {
    'use strict';
    $.getJSON('/getIndex', function(result) {
        $('#output').html(JSON.stringify(result, null, 4));
    });
});
