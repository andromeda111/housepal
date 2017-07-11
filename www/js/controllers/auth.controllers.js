angular.module('app.auth.controllers', [])

  .controller('loginCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicPopup', function($scope, $state, $stateParams, $http, AuthService, $ionicPopup) {

    $scope.loginFormData = {
      'email': '',
      'password': ''
    }

    $scope.login = function() {
      AuthService.login($scope.loginFormData).then(function(msg) {
        $state.go('tabsController.messageBoard');
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
