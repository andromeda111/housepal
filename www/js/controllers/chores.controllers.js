angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    $scope.getChores = function () {
      $http.get('http://localhost:9000/chores/house').then(function(result) {
        $scope.result = result.data
      });
    }

  }])
