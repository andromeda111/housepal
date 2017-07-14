angular.module('app.newChore.controllers', [])

  .controller('newChoreCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicHistory', function($scope, $stateParams, $http, $state, $ionicHistory) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.checked_housemates = [];

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log($scope.houseUsers);
      })
    })


    $scope.createChore = function (newChore) {
      newChore.cycle = {cycleList: $scope.checked_housemates}
      console.log(newChore);

      $http.post(`http://localhost:9000/chores/new`, newChore).then(result => {
        console.log('success');
        console.log(result);
        $state.go('tabsController.chores')
      })
    }

    // $scope.$on("$ionicView.leave", function () {
    //    $ionicHistory.clearCache();
    //    $ionicHistory.clearHistory();
    // });

  }])
