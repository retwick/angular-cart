var app = angular.module("myModule", [])
				.controller("myController",['$scope','$http', function($scope, $http){
				$scope.carts=[];
				$scope.products = [
					{p_id: "1", p_name: "Allie", p_image: "images/allie.jpg", p_price: 200, p_qty: 0},
					{p_id: "2", p_name: "Dillion", p_image: "images/dillion.jpg", p_price: 600, p_qty: 0},
					{p_id: "3", p_name: "Mia", p_image: "images/mia.jpg", p_price: 150, p_qty:0 }					
				];
				
				$scope.add_cart = function(product){
					var obj = $scope.carts.find(x => x.p_id === product.p_id);
					var i = $scope.carts.indexOf(obj);					
					if( i < 0 ){
						//if not found then push to array
						$scope.carts.push({p_id: product.p_id, p_name: product.p_name, p_price: product.p_price, p_qty:1});
					}
					else{	
						//if found item then, increment item quantity & update total
						$scope.carts[i].p_qty += 1;
						$scope.total += product.p_price;							
					}				
				}						
					
				$scope.total = 0;
				
				$scope.setTotals = function(cart){
					if(cart){
						$scope.total += cart.p_price;
					}
				}
				
				$scope.remove_cart = function(product){
					var obj = $scope.carts.find(x => x.p_id === product.p_id);
					var i = $scope.carts.indexOf(obj);
					
					if(product){
						var tempQuantity = $scope.carts[i].p_qty;
						if (tempQuantity > 1) {
							//if quantity is greater than 1 then decrement product quantity
							$scope.carts[i].p_qty -= 1;
						}
						else{
							//delete product from cart
							$scope.carts.splice(i, 1);
						}
						$scope.total -= product.p_price;						
					}
				}											
    			$scope.options = {
		     	   'key': 'rzp_test_2LJTA0baC5T5ER',
		  		    // Initialize amount with Re.1
		  	        'amount': '100',
	    	    	'name': '',
		      		'description': 'Pay for tickets',
	    		    'image': '/images/logo.png',
	    	    	'handler': function (transaction) {
		       			$scope.transactionHandler(transaction);
      				},
		    		'prefill': {
	        		'name': 'retwick',
	        		'email': 'rr@gmail.com',
	        		'contact': '9500197488'
	      			}
    			};

    			$scope.transactionHandler= function(transaction){
    				$http.post('/purchase',transaction);
    			}

    			$scope.btnClick = function (total) {
    				console.log('hello');
    				console.log($scope.options);
    				$scope.options.amount = total;
    				console.log($scope.options);
      				var rzp1 = new Razorpay($scope.options);
				    rzp1.open();
    			};
				
			}//match at line 2			
		]) //end of controller
;