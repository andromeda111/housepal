angular.module('app.menu.controllers', [])

  .controller('menuCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicSideMenuDelegate', function($scope, $state, $stateParams, $http, AuthService, $ionicSideMenuDelegate) {

    $scope.goToHouseSettings = function () {
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go('tabsController.houseSettings');
    }


    // $scope.destroySession = function() {
    //   AuthService.logout();
    // };
    //
    // $scope.getInfo = function() {
    //   $http.get('http://localhost:9000/memberinfo').then(function(result) {
    //     $scope.memberinfo = result.data;
    //   });
    // };
    //
    // $scope.deltest = function() {
    //   $http.get('http://localhost:9000/deleteHouse').then(function(result) {
    //     $scope.memberinfo = 'deleted house 1';
    //   });
    // };

    $scope.logout = function() {
      AuthService.logout();
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go('login');
    };

  }])
