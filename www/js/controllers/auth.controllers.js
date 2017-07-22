angular.module('app.auth.controllers', [])

  .controller('loginCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicPopup', '$ionicPush', 'API_URL', function($scope, $state, $stateParams, $http, AuthService, $ionicPopup, $ionicPush, API_URL) {

    $scope.loginFormData = {
      'email': '',
      'password': ''
    }

    $scope.login = function() {
      AuthService.login($scope.loginFormData).then(function(msg) {
        $ionicPush.register().then(function(t) {
          // Update device token for user in database
          $http.put(API_URL.url + `/users/updateDeviceToken`, t).then(() => {
          })
          return $ionicPush.saveToken(t);
        }).then(function(t) {
          console.log('Token saved:', t.token);
        });
        // On successful login, check if User belongs to a house and direct to appropriate state
        $http.get(API_URL.url + `/users/current`).then(function(result) {
          !result.data[0].house_id ? $state.go('houseSetup') : $state.go('tab.settings')
        });
      }, function(errMsg) {
        let alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });
      });
    };
  }])

  .controller('signupCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicPopup', function($scope, $state, $stateParams, $http, AuthService, $ionicPopup) {

    $scope.signupFormData = {
      'name': '',
      'email': '',
      'password': ''
    }

    $scope.signup = function() {
      AuthService.register($scope.signupFormData).then(function(msg) {
        $state.go('login');
        let alertPopup = $ionicPopup.alert({
          title: 'Registration successful!',
          template: msg
        });
      }, function(errMsg) {
        let alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: errMsg
        });
      });
    };
  }])

  .controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout()
      $state.go('login')
      let alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });
  });
