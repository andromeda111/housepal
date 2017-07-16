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

      console.log(newChore);
      let daysDue = []

      if (newChore.daysDue.sunday === true) {
        daysDue.push('sunday')
      }
      if (newChore.daysDue.monday === true) {
        daysDue.push('monday')
      }
      if (newChore.daysDue.tuesday === true) {
        daysDue.push('tuesday')
      }
      if (newChore.daysDue.wednesday === true) {
        daysDue.push('wednesday')
      }
      if (newChore.daysDue.thursday === true) {
        daysDue.push('thursday')
      }
      if (newChore.daysDue.friday === true) {
        daysDue.push('friday')
      }
      if (newChore.daysDue.saturday === true) {
        daysDue.push('saturday')
      }

      newChore = {
        chore: newChore.chore,
        daysDue: {daysDue: daysDue},
        cycle: {cycleList: $scope.cycleList},
        currentAssigned: 0,
        currentDueDay: {currentDueDay: 6}
      }


      console.log(newChore);
      $http.post(`http://localhost:9000/chores/new`, newChore).then(result => {
        console.log('success');
        console.log(result);
        $state.go('tabsController.chores')
      })
    }


  }])
