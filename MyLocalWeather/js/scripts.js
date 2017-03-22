/**
	My Local Weather scripts file
  
	Author  : Maurizio Aru
	Created : 2016.08.31
 */

/* Main AngularJS application declaration */
var app = angular.module('weather', []);

/* WeatherAPI Factory */
app.factory('WeatherApi', function($http) {
  var wapi = {};
  
  /* retrive location from client IP address */
  wapi.getLocation = function() {
    return $http.get("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
	
  /* return weather infos for city */
  wapi.getWeatherInfo = function(city) {
	var owmID = '88345ddd8559d9793da76c8dfb3ed7e0';
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=metric";
    var appid = "&APPID=" + owmID;
    var cb = "&callback=JSON_CALLBACK";
    
    return $http.jsonp(api + city + units+ appid + cb);
  };
	
  return wapi
});

/* Main controller */
app.controller('WeatherController', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  $scope.Data.sysChange = false;
	
  WeatherApi.getLocation()
	.success(function(data){
		console.log("WeatherApi.getLoc() returned some data");
		var cityLoc = data.city + "," + data.country;
		$scope.Data.city = data.city;
		$scope.Data.country = data.country;
		WeatherApi.getWeatherInfo(cityLoc)
			.success(function(data) {
				console.log("WeatherApi.getCurrent() returned some data");
				CurrentWeather(data)
			})
			.error(function(){
				alert('Error occurred retrieving weather infos');
			});
	})
	.error(function(){
		alert('Error occurred retrieving ipinfo data');
	});

	function CurrentWeather(data) {
	  	console.log("WeatherApi.getLoc() called");
		$scope.Data.temp = Math.round(data.main.temp);
		$scope.Data.TempC = Math.round(data.main.temp);
		$scope.Data.des = data.weather[0].main;
		$scope.Data.TempF = Math.round( ($scope.Data.temp * 9)/5 + 32 );
		return IconGen($scope.Data.des);
	}

  function IconGen(status) {
    console.log("IconGen() called");
    var wStatus = status.toLowerCase()
    switch (wStatus) {
      case 'dizzle':
        addIcon(wStatus)
        break;
      case 'clouds':
        addIcon(wStatus)
        break;
      case 'rain':
        addIcon(wStatus)
        break;
      case 'snow':
        addIcon(wStatus)
        break;
      case 'clear':
        addIcon(wStatus)
        break;
      case 'thunderstom':
        addIcon(wStatus)
        break;
      default:
    		$('div.clouds').removeClass('hide');
    }
  }

  function addIcon(city) {
    console.log("AddIcon() called");
    $('div.' + city).removeClass('hide');
  }
  
	/* funzione che cambia l'unità di misura della temperatura */
  $scope.Data.sys= function(){
	  var result = false;
	  
	  console.log('Data Unit: ' + $scope.Data.unit);
	  switch($scope.Data.unit){
		  case 'F': // Farenheit => Celsius
			  $scope.Data.temp = $scope.Data.TempC;
			  $scope.Data.unit = 'C';
			  result = false;
			  break;
			  
		  default: // Celsius (default) => Farenheit
			  $scope.Data.unit = 'F';
			  $scope.Data.temp = $scope.Data.TempF;
			  result = true;
			  break;
	  }
	  
	  return result;
  }
  
  
});