/**
 * Created by bcuser on 12/4/16.
 */
$(document).ready(function() {
    'use strict';

    //about button
    $('#aboutButton').click(function() {
        console.log('about');

        $('#aboutResults').html('Stuff that appears when about button is pressed');
        $('#formResults').html('It worked!');
    });

});
