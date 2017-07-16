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
        daysDue.push(0)
      }
      if (newChore.daysDue.monday === true) {
        daysDue.push(1)
      }
      if (newChore.daysDue.tuesday === true) {
        daysDue.push(2)
      }
      if (newChore.daysDue.wednesday === true) {
        daysDue.push(3)
      }
      if (newChore.daysDue.thursday === true) {
        daysDue.push(4)
      }
      if (newChore.daysDue.friday === true) {
        daysDue.push(5)
      }
      if (newChore.daysDue.saturday === true) {
        daysDue.push(6)
      }

      let actualDue;
        if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
          actualDue = daysDue[1]
        } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
        actualDue = daysDue[1]
      } else {
        actualDue = daysDue[0]
      }

      newChore = {
        chore: newChore.chore,
        daysDue: {daysDue: daysDue},
        cycle: {cycleList: $scope.cycleList},
        currentAssigned: 0,
        currentDueDay: {currentDueDay: actualDue}
      }


      console.log(newChore);
      $http.post(`http://localhost:9000/chores/new`, newChore).then(result => {
        console.log('success');
        console.log(result);
        $state.go('tabsController.chores')
      })
    }


  }])
