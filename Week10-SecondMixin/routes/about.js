/**
 * Created by bcuser on 11/28/16.
 */

var express = require('express');
var router = express.Router();


router.get('/about', function(req, res) {
    res.render('About', {
        title: 'Prog320-Yu',
        description: 'jquery demo' });
});


module.exports = router;