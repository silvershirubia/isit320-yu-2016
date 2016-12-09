$(document).ready(function() {
    'use strict';

    $('#feetInMile').click(function() {
        $('#display').html('There are 5280ft in 1 mile.');
    });

    $('#feetToMiles').click(function() {
        var feet = $('#input').val();
        var input = {
            feet: feet
        };

        $.getJSON('/feetToMiles', input, function(result) {
            var output = JSON.stringify(result, null, 4);
            $('#display').html(output);
            console.log(output);
        });
    });

    $('#milesToFeet').click(function() {
        var miles = $('#input').val();
        var input = {
            miles: miles
        };

        $.getJSON('/milesToFeet', input, function(result) {
            var output = JSON.stringify(result, null, 4);
            $('#display').html(output);
            console.log(output);
        });
    });

    $('#circle').click(function() {
        var rad = $('#input').val();
        var input = {
            radius: rad
        };

        $.getJSON('/utils/radiusToCircumference', input, function(result) {
            var output = JSON.stringify(result, null, 4);
            $('#display').html(output);
            console.log(output);
        });
    });

});
