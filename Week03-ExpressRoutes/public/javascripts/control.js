/**
 * Created by bcuser on 10/5/16.
 */

$(document).ready(function() {
    'use strict';
    console.log('Document loaded in prog272');

    $('#read').click(read);
    $('#readJson').click(readJson);
    $('#add').click(add);

    function read() {
        console.log('callRead called');

        $.getJSON('/read', function(result) {
            console.log(result);
            $('#display').html(JSON.stringify(result));
        });
    }

    function readJson() {
        console.log('readJson called');
        $.getJSON('names.json', function(result) {
            console.log(result);
            $('#display').html(JSON.stringify(result));
        });
    }

    function add() {
        var operatorA = $('#operatorA').val();
        var operatorB = $('#operatorB').val();
        console.log('operators:', operatorA, operatorB);
        var requestQuery = {
            operatorA: operatorA,
            operatorB: operatorB
        };

        $.getJSON('/add', requestQuery, function(result) {
            console.log('here');
            $('#display').html(JSON.stringify(result));
        });

    }

});
