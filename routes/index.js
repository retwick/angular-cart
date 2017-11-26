var express = require('express');
var router = express.Router();
var path = require('path');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/*
router.post('/getData', function (req, res) {
   var total = req.body.params.total; // it contains the total value 
   res.render('index');
   //console.log(total);
});
*/

router.get('/getData', function (req, res) {
   var total = req.query.total; // it contains the total value
   
   //console.log(total);
});

 
module.exports = router;