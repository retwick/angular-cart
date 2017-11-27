var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var Razorpay = require('razorpay');
//var app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(__dirname));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/confirmed',function(req,res,next){
  res.sendFile(path.join(__dirname, '../', 'views', 'confirmed.html'));	
})

/*
router.post('/getData', function (req, res) {
   var total = req.body.params.total; // it contains the total value 
   res.render('index');
   //console.log(total);
});


router.get('/getData', function (req, res) {
   var total = req.query.total; // it contains the total value   
   //console.log(total);
});
*/

var instance = new Razorpay({
  key_id: 'rzp_test_2LJTA0baC5T5ER',
  key_secret: 'BeGQT6njfhjfkNacqd4ARzum'
})

router.post('/purchase', (req,res) =>{
    payment_id =  req.body;
    console.log('in purchase')
    
     instance.payments.fetch(payment_id.razorpay_payment_id).then((response) => {
    	console.log('in fetch');
     	instance.payments.capture(payment_id.razorpay_payment_id, response.amount).then((response) => {
     		console.log('in capture');
     		//res.sendFile(path.join(__dirname, '../', 'views', 'confirmed.html'));
  			//res.render('confirmed');
   		}).catch((error) => {console.log(error);});
	
 	}).catch((error) => {console.log(error);});
 });

module.exports = router;
