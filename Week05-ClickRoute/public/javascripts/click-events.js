define(['jquery'], function(jquery) {
    'use strict';

    var elf = {};
    elf.run = {};

    elf.ClickEvents = (function() {
        var listItem = $('.listItem');
        var intro = $('#intro');

        function ClickEvents() {
            $(intro).html('ClickEvents is loaded. Click the three items seen below.');
            $(intro).addClass('blue');
            $(listItem).click(listClick);
        }

        var listClick = function(event) {
            var theRoute = '/' + event.target.innerText;
            $.getJSON(theRoute, function(result) {
                var prompt = 'Info shown below';
                $(intro).html(prompt);

                $('.resultsInfo').addClass('pretty');
                $('#result').html('Result : ' + result.result);
                $('#route').html('Route : ' + result.route);
                $('#message').html('Message : ' + result.message);
            });

        };

        return ClickEvents;

    }());

    return elf.ClickEvents;

});
