/**
 * @author Charlie Calvert
 */

require.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery.min',
        'ClickEvents': 'javascripts/click-events'
    }
});

require(['jquery', 'ClickEvents'], function($, ClickEvents) {
    'use strict';

    console.log('main called');
    $(document).ready(function() {
        var clickEvents = new ClickEvents();
    });
});
