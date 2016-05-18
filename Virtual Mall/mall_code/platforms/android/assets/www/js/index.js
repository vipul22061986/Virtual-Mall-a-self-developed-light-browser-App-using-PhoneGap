/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //uncomment for testing in Chrome browser
	   onDeviceReady();
});

function onDeviceReady() {
		
		device_id = device.uuid ;
		
		//navigator.startApp.check("com.example.appdb1", function(message) { /* success */
		
		//}, 
		//function(error) { /* error */
		//	alert(error + " App not installed.");
		//}); 
		
		 var options = {maximumAge: 4000, timeout: 8000, enableHighAccuracy: true };
			navigator.geolocation.getCurrentPosition(onSuccessFindMe, onFailFindMe, options);
			function onSuccessFindMe(position){
				 gpsLatitude = position.coords.latitude;
				 gpsLongitude = position.coords.longitude;
				 //alert(gpsLatitude + "====="+ gpsLongitude);
	 			var geocoder;
				var html='';
				 $.ajax({
					type:"GET", 
					url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+gpsLatitude + "," +gpsLongitude+"&sensor=true", 
					dataType: "json",
					success: function(data) {
							var address = data.results;
							country = address[0].formatted_address;
							//alert(country);
							//document.getElementById('full_address').innerHTML = country;
							},
					error: function(jqXHR) {
									alert("erro"+JSON.stringify(jqXHR));
							}
				 });
				}
				function onFailFindMe(){
				//	alert("Please turn on the gps of ypur device");                // buttonName
				}	
						

		 d = new Date,
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
		dformat.toString();
	}
	
	
	function addApp(){
			$(".add").css("display", "none");
			$(".appnv3").css("display", "block");
	}
	
	function gMaps(){
			appViewed('googleMaps');
			navigator.startApp.start(" com.google.android.apps.maps ", function(message) {  /* success */
			//alert(message); // => OK
			}, 
			function(error) { /* error */
				alert(error + " App not installed.");
			});
		}
	
	function appdb1(){
			appViewed('appdb1');
			navigator.startApp.start("com.example.appdb1", function(message) {  /* success */
			//alert(message); // => OK
			}, 
			function(error) { /* error */
				alert(error + " App not installed.");
			});
		}
	
	function accuweather(){
			appViewed('Accuweather');
			navigator.startApp.start("com.accuweather.android", function(message) {  /* success */
			//alert(message); // => OK
			}, 
			function(error) { /* error */
				alert(error + " App not installed.");
			});
		}
	
	function chrome(){
			appViewed('Chrome');
			navigator.startApp.start("com.android.chrome", function(message) {  /* success */
			//alert(message); // => OK
			}, 
			function(error) { /* error */
				alert(error + " App not installed.");
			});
		}
	
	function googlemaps(){
			appViewed('GoogleMaps');
			
			 setTimeout(function(){ 
			 	navigator.startApp.start("com.google.android.apps.maps", function(message) {  /* success */
				//alert(message); // => OK
				}, 
				function(error) { /* error */
					alert(error + " App not installed.");
				});
			  }, 100);
			 
			
		}
		
	function appViewed(appname){
	
		//alert(appname + " : app name " + device_id + " : device id" + dformat + " : date & time " + country+ " : country");
		
		var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);

		  db.transaction(function(tx) {
			//tx.executeSql('DROP TABLE IF EXISTS test_table');
			tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, appname text, date_time text, address text)');
		
			tx.executeSql("INSERT INTO test_table (appname, date_time, address) VALUES (?,?,?)", [appname, dformat, country], function(tx, res) {
			//  alert("insertId: " + res.insertId + " -- probably 1");
			//  alert("Number of rows inserted: " + res.rowsAffected);
		  	
			  tx.executeSql("SELECT COUNT(*) as number_of_time_opened FROM test_table Where appname = '" + appname + "'", [], function(tx, res) {
				
				number_of_times = res.rows.item(0).number_of_time_opened;
				number_of_times.toString();
				
				function onSuccess(success) {
					console.log('Success: ' + success);
				}
				
				function onError(error) {
					console.log('Error:' + error);
				}
				
					//alert("Number of times the item viewed by the user : " + number_of_times);
					navigator.toast.show("Number of times the app opened by the user : " + number_of_times +"", onSuccess, onError, {
						duration: 1
					});
				}); 
				
			  });
			  
			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
	}