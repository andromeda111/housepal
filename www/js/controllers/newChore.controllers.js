angular.module('app.newChore.controllers', [])

  .controller('newChoreCtrl', ['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.checked_housemates = [];
      $scope.cycleList = [];
      $scope.houseUsers = [];

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
      })
    })


    $scope.createChore = function (newChore) {


      let daysArr = [newChore.sunday, newChore.monday, newChore.tuesday, newChore.wednesday, newChore.thursday, newChore.friday, newChore.saturday].map(el => {
        if (!el) {
          el = false
        }
        return el
      })

      newChore = {
        chore: newChore.chore,
        daysDue: {daysDue: daysArr},
        cycle: {cycleList: $scope.cycleList}
      }
      console.log(newChore);
      //
      // $http.post(`http://localhost:9000/chores/new`, newChore).then(result => {
      //   console.log('success');
      //   console.log(result);
      //   $state.go('tabsController.chores')
      // })
    }


  }])
