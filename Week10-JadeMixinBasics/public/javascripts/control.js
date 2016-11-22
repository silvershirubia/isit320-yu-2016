$(document).ready(function() { 'use strict';

    $("#target").submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $.getJSON('/foo?'+ userFormData, function (result) {

            $('#serverResults').html(JSON.stringify(result, null, 4));
        });

        $('#formResults').html(userFormData.replace(/\&/g, '\n'));
    });


});
