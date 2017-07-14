angular.module('app.newChore.controllers', [])

  .controller('newChoreCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];
      $scope.checked_fruits = ['apple', 'pear'];
      $scope.addFruit = function(fruit) {
        if ($scope.checked_fruits.indexOf(fruit) != -1) return;
        $scope.checked_fruits.push(fruit);
      };

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log($scope.houseUsers);
      })
    })


    $scope.createChore = function (newChore) {
      console.log(newChore);
    }

  }])
