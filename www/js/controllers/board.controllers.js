angular.module('app.board.controllers', [])

  .controller('messageBoardCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', 'API_ENDPOINT', function($scope, $state, $stateParams, $http, AuthService, API_ENDPOINT) {

    $scope.destroySession = function() {
      AuthService.logout();
    };

    $scope.getInfo = function() {
      $http.get('http://localhost:9000/memberinfo').then(function(result) {
        $scope.memberinfo = result.data;
      });
    };

    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };
  }])
