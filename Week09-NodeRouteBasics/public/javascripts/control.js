$(document).ready(function() { 'use strict';

    $('#feetToMiles').click(check);

    function check() {
        var miles = $('#mileInput').val();
        var input = {miles: miles};

        $.getJSON('/feetToMiles', input,function (result) {
            var output = JSON.stringify(result, null, 4);
            $('#display').html(output);
            console.log(output);
        });


    }
});
