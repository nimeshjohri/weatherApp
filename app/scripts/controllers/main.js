'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
  .controller('MainCtrl', ['$scope','$http', function($scope, $http){
    $scope.sampjson=[]; 
    $scope.finalResult=[];
    $scope.jsonData=[];
    $scope.jsonTemp=[];
    $scope.arr=[];
    $scope.arr1=[];
    $scope.newArray = [];
    $scope.timeArray = [];
    $scope.currentData=[];
    $scope.url;
    function initialize() {
        console.log('Gmaps API Inialized');
        var mapOptions = {
          center: { lat: $scope.latt, lng: $scope.long},
          zoom: 12
        };
        var map = new google.maps.Map(document.getElementById('gmaps'),
            mapOptions);
      }
        

    var strUser = $("#ddlViewBy").val();
    var date = new Date,
    currentDay=date.getDay(),
    currentDate = date.getDate(),
    hour = date.getHours(),
    ampm = hour > 12 && hour <24 ? "PM" : "AM";
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.$watch('viewBy', function (strUser) {
                                            if ( strUser == null){
                                                $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Gurgaon.json';
                                            }
                                            if ( strUser === '1'){
                                                $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Jaipur.json';
                                            }
                                            if (strUser === '2'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Gurgaon.json';
                                            }
                                            if (strUser === '3'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Mumbai.json';
                                            }
                                            if (strUser === '4'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Kolkata.json';
                                            }
                                            if (strUser === '5'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Hyderabad.json';
                                            }
                                            if (strUser === '6'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Chennai.json';
                                            }
                                            if (strUser === '7'){
                                                 $scope.url = 'http://api.wunderground.com/api/5e9a2a2870ff2b3e/geolookup/conditions/forecast/q/India/Ahmedabad.json';
                                            }
                                            

    $http.get($scope.url).success (function(result)
    {
                console.log(result);
                $scope.currentData=result;
                $scope.icon=$scope.currentData.current_observation.icon_url;
                $scope.latt=Math.round($scope.currentData.location.lat * 100) / 100;
                $scope.long=Math.round($scope.currentData.location.lon * 100) / 100; 
                initialize();
                if($scope.currentData.current_observation.temp_c > 15){
                    document.getElementById('feelstyle').style.color = '#FF8533';
                } else if($scope.currentData.current_observation.temp_c < 0){
                    document.getElementById('feelstyle').style.color = '#0066FF';
                }
        })
    });
    $http.get('scripts/temperature.json').success (function(result)
    {
                
    for (var q=0;q<result.allvalues.length;q++) 
        {
            $scope.sampjson[q] = result.allvalues[q]
        }
    for(var m=0;m<$scope.sampjson.length;m++)
        {
            $scope.jsonData.push(parseInt($scope.sampjson[m].time));
        }
    for(var j=0;j<8;j++)
        {
            $scope.arr1[j]=hour+j;
        if((hour+j)>23)
        {
            $scope.arr1[j]=(hour+j)-24;
        }
            $scope.timeArray.push($scope.arr1[j]);
        }
    console.log('timeArray is-----------');
    console.log($scope.timeArray);
   
    for(var i=0;i<7;i++)
        {
            $scope.arr[i]=currentDay+i;
        if((currentDay+i)>6)
        {
            $scope.arr[i]=(currentDay+i)-7;
        }
            $scope.newArray[i]=weekday[$scope.arr[i]];
        }

    for (var x in $scope.jsonData) 
        {
    for (var y in $scope.timeArray) 
        {
        if ($scope.jsonData[x] == $scope.timeArray[y]) {
            $scope.jsonTemp.push(parseInt($scope.sampjson[x].temp));   
        }
        }
        }   

    $('#contain').highcharts({
        title: {
            text: 'Daily Average Temperature',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Time (24 Hours Format)'
            },
            categories: [$scope.timeArray[0]+ampm,$scope.timeArray[1] ,$scope.timeArray[2],$scope.timeArray[3], $scope.timeArray[4], $scope.timeArray[5],
                $scope.timeArray[6], $scope.timeArray[7]]
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Temp',
            data: [$scope.jsonTemp[0], $scope.jsonTemp[1], $scope.jsonTemp[2], $scope.jsonTemp[3], $scope.jsonTemp[4], $scope.jsonTemp[5], $scope.jsonTemp[6], $scope.jsonTemp[7]]
        }]
    })

    console.log('Inside controller');
    });
    
  }]);
