$(document).ready(function() {
    'use strict';

    $('#target').submit(function(event) {
        event.preventDefault();
        var userFormData = $(this).serialize();
        $.getJSON('/foo?' + userFormData, function(result) {

            $('#serverResults').html(JSON.stringify(result, null, 4));
        });

        $('#formResults').html(userFormData.replace(/\&/g, '\n'));
    });

    $('nav li').hover(function(event) {
        setActiveMenuItem(event.currentTarget.id);
    });

    function setActiveMenuItem() {

        $(".nav li").removeClass("active");

        // var menuItem = $('a[href=".' + this.location.pathname + '"]');
        var name = this.location.pathname;
        var name = name.slice(1, name.length).trim();
        if (name.length === 0) { name = 'home'; }
        var selector = '#' + name;
        try {
            var menuItem1 = $(selector);
            menuItem1.addClass('active');
        } catch(e) {
            // console.log('Could not find selector. This is expected when testing.', e);
        }
    }

});
