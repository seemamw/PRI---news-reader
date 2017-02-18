angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //--------------------------------------------
   $scope.login = function(user) {
			
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill username and password to proceed.');	
			return false;
		}

		if(user.username=='demo@gmail.com' && user.password=='demo'){
			$location.path('/app/dashboard');
		}else{
			$scope.showAlert('Invalid username or password.');	
		}
		
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
  //--------------------------------------------
})

.controller('ProfilesCtrl', function($scope , Profiles) {
    $scope.profiles = Profiles.all();
})

.controller('ProfileCtrl', function($scope, $stateParams , Profiles) {
	$scope.profile = Profiles.get($stateParams.profileId);
})

.controller('SetCtrl', function (ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };

  ionicTimePicker.openTimePicker(ipObj1);
})


.controller('DashCtrl', function($http, $scope, $stateParams , Profiles, $ionicFilterBar) {
  $scope.stories = [];
  function loadStories(params,callback) {
    $http.get("https://www.reddit.com/r/funny/new.json",{params: params})
    .success(function (response) {
      var stories = [];
      angular.forEach(response.data.children,function (child) {
        stories.push(child.data);
      });
      callback(stories);
    });
  }

  $scope.doRefresh = function () {
    $scope.stories = window.Values;
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.showFilterBar = function () {
    filterBar = $ionicFilterBar.show({
      items: $scope.stories,
      update: function (filteredItems) {
        $scope.stories = filteredItems
      }
      //filterProperties : 'first_name'
    });
  }
   
  $scope.loadOlderStories = function () {
    var params ={};
    if($scope.stories.length > 0){
      params['after'] = $scope.stories[$scope.stories.length-1].name;
    }
    loadStories(params,function (olderStories) {
      $scope.stories = $scope.stories.concat(olderStories);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
   
  $scope.loadNewerStories = function () {
    var params = {'before':$scope.stories[0].name};
    loadStories(params,function (newerStories) {
      $scope.stories = newerStories.concat($scope.stories);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.setting = function() {
    console.log("toto");
    $location.path('/app/setting');
  }
});

