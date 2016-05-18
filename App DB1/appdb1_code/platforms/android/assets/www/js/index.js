$(document).ready(function(){
	

});

function itemViewed(itemcode,itemname,itemprice){
		//alert(itemcode + " : code " + itemprice + " : price " + itemname + " : name" );
		$(".display_none").css("display", "block");
		
		var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);

				 db.transaction(function(tx) {
					
			//tx.executeSql('DROP TABLE IF EXISTS test_table');
			tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, item_code integer, item_name text, item_price integer)');
		
			tx.executeSql("INSERT INTO test_table (item_code, item_name, item_price) VALUES (?,?,?)", [itemcode , itemname , itemprice], function(tx, res) {
			  //alert("Number of rows inserted: " + res.rowsAffected);
		
			  tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
				 
//				alert("res.rows.item(0).cnt: " + res.rows.item(0).cnt);
				
			  tx.executeSql("SELECT COUNT(*) as number_of_time_opened FROM test_table Where item_code = " + itemcode, [], function(tx, res) {
				number_of_times = res.rows.item(0).number_of_time_opened;
				
				 function onSuccess(success) {
					console.log('Success: ' + success);
				}
				
				function onError(error) {
					console.log('Error:' + error);
				}
				
			/*	navigator.toast.show("Hello user! You have viewed the item : " + itemcode +" for " + number_of_times +" times. If you wish to purchase this item please click the buy button. ", onSuccess, onError, {
					duration: 1
				});*/
				
				alert("You have viewed the item : " + itemname + " with item code : " + itemcode + " for " + number_of_times + " times. If you wish to purchase this item please click the buy button.");
				
				// alert("Number of times the item viewed by the user : " + number_of_times); 
				}); 
			  });
		
			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		  });
	}

/***** Appdb1 js****/


	function Total(items,price){
		//alert("device id: " + device_id + items + "====" + price);
		var html='';
				 $.ajax({
					type:"GET", 
					url://"http://vm.workdemos.com/store_product.php?device_id="+device_id+ "&name="+items+"&price="+price+"", 
							"http://gannondataservicecenter.com/virtualmall/store_product.php?device_id="+device_id+ "&name="+items+"&price="+price+"",
					dataType: "json",
					success: function(data) {
							
							function onSuccess(success) {
								console.log('Success: ' + success);
							}
							
							function onError(error) {
								console.log('Error:' + error);
							}
							
							/*navigator.toast.show("Thank you for purchasing the item : " + items + "", onSuccess, onError, {
								duration: 1
							});*/
							
							alert("Thank you for purchasing the item : " + items + " for price $ " + price );
							
							//alert("Thank you for purchasing the Item " + items);
							$(".display_none").css("display", "none");		
								},
					error: function(jqXHR) {
									alert("erro"+JSON.stringify(jqXHR));
									$.mobile.loading("hide");
							}
				 });
	}
	
