(function(window){
/* In Part 1 of the tutorial, we will build a JavaScript library that is used to provide product information asynchronously using Promises. */
    function myLibrary(){
		var catalog = createRandomCatalog(100);
		
		return {
		            searchProductById: searchProductById,
		            searchProductsByPrice: searchProductsByPrice,
		            searchProductsByType: searchProductsByType,
		            searchAllProducts: searchAllProducts
		        }
    

				/* returns a Promise containing the product with the specified ID */
				function searchProductById(id) {
					var promise =  new Promise(function(resolve, reject){
						var i = 0;
						setTimeout(function(){
							while (i < catalog.length){
						    	if (catalog[i].id == id){                        
						        	resolve({id:id,price:catalog[i].price,type:catalog[i].type});
						        }
						        i++;
						    }
						    reject("Invalid ID: " + id);
						},1000);
					});
					
					return promise;
				}

				/* returns a Promise containing an array of products with the specified type */
				function searchProductsByType(type) {
					var promise = new Promise(function(resolve,reject){
				           var i = 0;
				           var typeArray = [];
				           var possibleTypes = ['Electronics','Book','Clothing','Food'];
				           if(!possibleTypes.includes(type)){
				               reject("Invalid Type: " + type)
				           }
				           else{
				               setTimeout(function(){
				                   while (i < catalog.length){
				                       if (catalog[i].type == type){
										 typeArray.push({ 
											 id: catalog[i].id,
											 price: catalog[i].price,
											 type: catalog[i].type
										 });
				                       }
				                       i++;
				                   }
				                   resolve(typeArray);
				               },1000);
				           }
					   });
				       return promise;
				}

				/* returns a Promise containing an array of products that are within a certain amount of the specified price. */
				function searchProductsByPrice(price,difference) {
					console.log("searchProductsByPrice: price",price,", difference",difference)
					var promise = new Promise(function(resolve,reject){
					        var i = 0;
					        var priceArray = [];
					        if(!isFinite(price)){
					            reject("Invalid Price: " + price)
					        }
					        else{
					            setTimeout(function(){
					                while (i < catalog.length){
					                    if (Math.abs(catalog[i].price - price) < difference){
					                        priceArray.push({
												id: catalog[i].id,
												price: catalog[i].price,
												type: catalog[i].type
											});
					                    }
					                    i++;
					                }
					                resolve(priceArray);
					            },1000);
					        }
					    });
					    return promise;
				}

				/* returns a Promise containing an array of all the products in the catalog */
				function searchAllProducts() {
					var promise = new Promise(function(resolve, reject){
						setTimeout(function() {
							resolve(catalog);
						}, 1000);
					});
					
					return promise;
				}

				/* a function used to create a random product ( this is not accessible outside of the library file) */
				function createRandomProduct() {
					var typeArray = ['Electronics','Book','Clothing','Food'];
					var price = (Math.random()*500).toFixed(2) 
					var type = typeArray[Math.floor(Math.random()*4)];

					return {price: price, type: type};
				}

				/* a function used to create a catalog of random products ( this is not accessible outside of the library file) */	
				function createRandomCatalog(num) {
					var catalog = [];
					for (var i = 0; i < num; i++){
						var obj = createRandomProduct();
						catalog.push({id:i,price:obj.price,type:obj.type});
					}
					return catalog;
				}
	
	}
	
	if(typeof(window.api) === 'undefined'){
    	window.api = myLibrary();
	}

})(window); 