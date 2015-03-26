
var bookmymove = angular.module('bookmymove',[
	'ngRoute',
	'templates',
	'ngMaterial',
  'ngAria',
  'ngAnimate',
	'ngAutocomplete',
  'ui.date',
  'ui.map',
  'pickadate',
  'ngMessages',
  'ui.mask'
	]);
bookmymove.config(['$routeProvider', '$mdThemingProvider', function($routeProvider,$mdThemingProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'index.html',
		controller: 'indexCtrl'
	})
    .when('/map', {
        templateUrl: 'map.html',
        controller: 'MapCtrl'
    })
    .when('/registration',{
      templateUrl: 'registration.html',
      controller: 'RegistrationCtrl'
    })
        .when('/packer_registration',{
      templateUrl: 'packer_registration.html',
      controller: 'PackerRegistrationCtrl'

    })

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('teal');
        $mdThemingProvider.theme('docs-darks', 'default')
        .primaryPalette('blue');
}]);

//service
bookmymove.service('mapService',['$rootScope', function($rootScope) {
    console.log("map service initialized, will not initialize again")
    this.directionsDisplay;
    this.directionsService = new google.maps.DirectionsService();
    this.map;
    this.initial_loc = 'demo text for angular material to work with google places in chrome';
    this.end_loc = 'demo text for angular material to work with google places in chrome';
    this.distance = 'hello';
    var km = '';
    this.initialize = function () {
      // ;
      console.log('init');
      window.directionsDisplay = new google.maps.DirectionsRenderer();
      //var chicago = new google.maps.LatLng(39.50, -87.6500523);
      var india = new google.maps.LatLng(21.7679, 78.8718);
      var mapOptions = {
          center: india,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        style: google.maps.ZoomControlStyle.default,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      };
      window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay.setMap(map);
      /*if (this.data.initial != '' && this.data.final != '') {
        init_route(this.data.initial, this.data.final, this.directionsService);
      }*/
    };
    /*var init_route = function (start, end, service) {
      // ;
      console.log('init_route');
      var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
      service.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    };
    this.calcRoute = function (start, end, moveService, func) {
      var duration = '';
      var distance = '';
      var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
      this.directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var distance = response.routes[0].legs[0].distance.text;
          var durationtext = response.routes[0].legs[0].duration.text;
          var duration = response.routes[0].legs[0].duration.value / 3600;
          //console.log(distance,duration);
          $rootScope.$apply(function () {
            func.apply(moveService, [{
                'distance': distance,
                'duration': duration,
                'durationtext': durationtext,
                'to': end,
                'from': start
              }]);
          });
        }
      });  //console.log(start, end, args);
    };*/
  this.calcRoute = function(){
    console.log('into calcRoute')
      var start = this.initial_loc;
      var end = this.end_loc;
      //console.log(start);
      var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log('iam into directionsService');
        this.directionsDisplay.setDirections(response);
        km = response.routes[0].legs[0].distance.text;
        //console.info(this.distance);
      }
    });
    this.distance = km;
  };
}]);

//Controllers
bookmymove.controller('indexCtrl', ['$scope', function($scope){

}]);

bookmymove.controller('PackerRegistrationCtrl', ['$scope', function($scope){

}]);

bookmymove.controller('MapCtrl', ['$scope','mapService', function($scope,mapService){
  $scope.result2 = '';
  $scope.options2 = {
    country: 'in'
  };    $scope.details2 = '';
  $scope.result3 = '';
  $scope.options3 = {
    country: 'in'
  };    $scope.details3 = '';

    $scope.mapService = mapService;
    $scope.zipfrom = '';
    $scope.zipto = '';
    $scope.distance = '';
    $scope.$watch('mapService',function(){
      mapService = $scope.mapService;
      $scope.mapService = mapService;
    });
    $scope.currentdate = new Date();
}]);
bookmymove.controller('RegistrationCtrl', ['$scope', function($scope){

$scope.firstName = '';
$scope.lastName = '';
$scope.emailid = '';
$scope.pattern_mob = '999-999-9999';
$scope.mobile_no = '';
$scope.pincode = '';
$scope.pattern_pin = '999-999';
$scope.modelOptions= {
  updateOn: 'default',
  debounce:{
    default: 500
  } 
}
$scope.cities = [
    { name: 'Pune'},
    { name: 'Ahmednagar'},
    { name: 'Mumbai' },
    { name: 'Nagpur' },
    { name: 'Solapur' },
    { name: 'Satara' },
    { name: 'Nasikh' },
    { name: 'Lonvala' },
  ];

  $scope.user_type = 'user';

  $scope.states = [
    { name: 'Andhra Pradesh'},
    { name: 'Arunachal Pradesh'},
    { name: 'Assam' },
    { name: 'Bihar' },
    { name: 'Chhattisgarh' },
    { name: 'Goa' },
    { name: 'Gujarat' },
    { name: 'Haryana' },
    { name: 'Himachal Pradesh' },
    { name: 'Jammu & Kashmir' },
    { name: 'Jharkhand' },
    { name: 'Karnataka' },
    { name: 'Kerala' },
    { name: 'Madhya Pradesh' },
    { name: 'Maharashtra' },
    { name: 'Manipur' },
    { name: 'Meghalaya' },
    { name: 'Mizoram' },
    { name: 'Nagaland' },
    { name: 'Odisha (Orissa)' },
    { name: 'Punjab' },
    { name: 'Rajasthan' },
    { name: 'Sikkim' },
    { name: 'Tamil Nadu' },
    { name: 'Telangana (from June 2, 2014)' },
    { name: 'Tripura' },
    { name: 'Uttar Pradesh' },
    { name: 'Uttarakhand' },
    { name: 'West Bengal' },
  ];

   $scope.districts = [
    { name: 'Pune'},
    { name: 'Ahmednagar'},
    { name: 'Mumbai' },
    { name: 'Nagpur' },
    { name: 'Solapur' },
    { name: 'Satara' },
    { name: 'Nasikh' },
    { name: 'Lonvala' },
  ];

   $scope.talukas = [
    { name: 'Pune'},
    { name: 'Ahmednagar'},
    { name: 'Mumbai' },
    { name: 'Nagpur' },
    { name: 'Solapur' },
    { name: 'Satara' },
    { name: 'Nasikh' },
    { name: 'Lonvala' },
  ];
}]);

bookmymove.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});