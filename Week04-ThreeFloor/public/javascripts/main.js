/**
 * Created by bcuser on 10/10/16.
 */

requirejs.config({
    baseUrl : '.',
    paths : {
        "jquery" : 'components/jquery/dist/jquery',
        "bootstrap": 'components/bootstrap/dist/js/bootstrap',
        "Three" : 'javascripts/three',
        "control" : 'javascripts/control',
        "Floors" : 'javascripts/floors'

    },
    shim : {
        'Three' : {
            exports: 'THREE'
        }
    }
});

requirejs([ 'jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'Three', 'control', 'Floors' ], function(bootstrap, THREE, Control, Floors) {
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});