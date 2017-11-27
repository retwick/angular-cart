var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var Razorpay = require('razorpay');

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

var instance = new Razorpay({
  key_id: 'rzp_test_2LJTA0baC5T5ER',
  key_secret: 'BeGQT6njfhjfkNacqd4ARzum'
})

router.post('/purchase', (req,res) =>{
    payment_id =  req.body;
    
     instance.payments.fetch(payment_id.razorpay_payment_id).then((response) => {    
     	instance.payments.capture(payment_id.razorpay_payment_id, response.amount).then((response) => {     		
  			res.redirect('confirmed');
   		}).catch((error) => {console.log(error);});
	
 	}).catch((error) => {console.log(error);});
 });

module.exports = router;
