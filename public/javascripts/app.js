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

				$scope.checkout  = function(total){
					$http.get("/getData", {params:{"total": total} });
    


/*
					$http({
        				url:'/getData', 
				        method: "GET",
				        params: total
     				});
     				*/
    				//console.log(total);
				}
			}]);