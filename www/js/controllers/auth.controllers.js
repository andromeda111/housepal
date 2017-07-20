angular.module('app.auth.controllers', [])

  .controller('loginCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicPopup', '$ionicPush', function($scope, $state, $stateParams, $http, AuthService, $ionicPopup, $ionicPush) {

    $scope.loginFormData = {
      'email': '',
      'password': ''
    }

    $scope.login = function() {
      AuthService.login($scope.loginFormData).then(function(msg) {
        $ionicPush.register().then(function(t) {
          console.log('token? ', t);
          $http.put('https://g48cap.herokuapp.com/users/updateDeviceToken', t).then(() => {
            console.log('updated user, back in controller');
          })
          return $ionicPush.saveToken(t);
        }).then(function(t) {
          console.log('Token saved:', t.token);
        });
        $http.get('https://g48cap.herokuapp.com/users/current').then(function(result) {
          console.log(result.data[0].house_id);
          !result.data[0].house_id ? $state.go('houseSetup') : $state.go('tabsController.messageBoard')
        });
      }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
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
        var alertPopup = $ionicPopup.alert({
          title: 'Registration successful!',
          template: msg
        });
      }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: errMsg
        });
      });
    };

  }])

  .controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });
  });
