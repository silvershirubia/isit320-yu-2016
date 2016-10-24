/**
 * Created by bcuser on 10/10/16.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'Three': 'javascripts/three',
        'control': 'javascripts/control',
        'Floors': 'javascripts/floors',
        'PointerLockControls': 'javascripts/pointer-lock-controls',
        'PointerLockSetup': 'javascripts/pointer-lock-setup'

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
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
