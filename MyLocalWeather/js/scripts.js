/**
	My Local Weather scripts file
  
	Author  : Maurizio Aru
	Created : 2016.08.31
 */

 
var app = angular.module('weather', []);

app.factory('WeatherApi', function($http) {
  var obj = {};
  
  obj.getLoc = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
	
  obj.getCurrent = function(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=metric";
    var appid = "&APPID=061f24cf3cde2f60644a8240302983f2"
    var cb = "&callback=JSON_CALLBACK";
	  
	  /*
	  JSON DATA SAMPLE
	  {
	     "coord":{
	  	     "lon":-0.13,
			  "lat":51.51
		  },
		  "weather":[
		     {
			    "id":802,
				 "main":"Clouds",
				 "description":"scattered clouds",
				 "icon":"03d"
			  }
		  ],
		  "base":"stations",
		  "main":{
			  "temp":291.96,
			  "pressure":1022,
			  "humidity":54,
			  "temp_min":290.93,
			  "temp_max":293.71
		  },
		  "wind":{
		     "speed":4.91,
			  "deg":202.503
		  },
		  "rain":{},
		  "clouds":{"all":48},
		  "dt":1474901851,
		  "sys":{
		     "type":3,
			  "id":258730,
			  "message":0.0049,
			  "country":"GB",
			  "sunrise":1474869277,
			  "sunset":1474912044
		  },
		  "id":2643743,
		  "name":"London",
		  "cod":200
		}
		*/
    
    return $http.jsonp(api + city + units+ appid + cb);
  };
	
  return obj
});

app.controller('WeatherController', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  $scope.Data.sysChange = false;
	
  WeatherApi.getLoc().success(function(data) {
	 console.log("WeatherApi.getLoc() returned some data");
    var cityLoc = data.city + "," + data.country;
    $scope.Data.city = data.city;
    $scope.Data.country = data.country;
    WeatherApi.getCurrent(cityLoc).success(function(data) {
		console.log("WeatherApi.getCurrent() returned some data");
    	CurrentWeather(data)
    });
  });

	function CurrentWeather(data) {
	  	console.log("WeatherApi.getLoc() called");
		$scope.Data.temp = Math.round(data.main.temp);
		$scope.Data.Cel = Math.round(data.main.temp);
		$scope.Data.des = data.weather[0].main;
		$scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
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
			  $scope.Data.temp = $scope.Data.Cel;
			  $scope.Data.unit = 'C';
			  result = false;
			  break;
			  
		  default: // Celsius (default) => Farenheit
			  $scope.Data.unit = 'F';
			  $scope.Data.temp = $scope.Data.Fah;
			  result = true;
			  break;
	  }
	  
	  return result;
  }
  
  
});