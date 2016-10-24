var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Yu' });
});

router.get('/read', function(request, response) {
  response.send([
    {name: 'SarahLee'},
    {name: 'Bob'}
  ]);
});

router.get('/add', function(request, response){

  console.log('add method called');
  console.log('The parameters are: ', request.query);

  response.send({
    answer: (parseInt(request.query.operatorA) + parseInt(request.query.operatorB))
  });

});

module.exports = router;
