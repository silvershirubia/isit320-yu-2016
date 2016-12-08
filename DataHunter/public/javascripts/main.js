/**
 * Created by bcuser on 10/10/16.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'Three': 'javascripts/three',
        'control': 'javascripts/control',
        'Collisions': 'javascripts/collisions',
        'Floors': 'javascripts/floors',
        'Maze': 'javascripts/maze',
        'Npcs': 'javascripts/npcs',
        'PointerLockControls': 'javascripts/pointer-lock-controls',
        'PointerLockSetup': 'javascripts/pointer-lock-setup',
        'ReadDatabase': 'javascripts/read-database',
        'Score': 'javascripts/score'

    },
    shim: {
        'Three': {
            exports: 'THREE'
        }
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['Three', 'control'], function(THREE, Control) {
        //window.THREE = THREE;
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
