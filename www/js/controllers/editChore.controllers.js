angular.module('app.editChore.controllers', [])

  .controller('editChoreCtrl', ['$scope', '$stateParams', '$http', '$state', 'API_URL', function($scope, $stateParams, $http, $state, API_URL) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.choreId = $stateParams.id
      $scope.editChore = {}
      $scope.checked_housemates = [];
      $scope.cycleList = [];
      $scope.houseUsers = [];

      $http.get(API_URL.url + `/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
      })
      $http.get(API_URL.url + `/chores/getById/${$scope.choreId}`).then(chore => {
        $scope.editChore.chore = chore.data.chore
        console.log('chore to edit: ', $scope.editChore);
      })
    })


        $scope.updateChore = function (editChore) {

          console.log(editChore);
          let daysDue = []

          if (editChore.daysDue.sunday === true) {
            daysDue.push(0)
          }
          if (editChore.daysDue.monday === true) {
            daysDue.push(1)
          }
          if (editChore.daysDue.tuesday === true) {
            daysDue.push(2)
          }
          if (editChore.daysDue.wednesday === true) {
            daysDue.push(3)
          }
          if (editChore.daysDue.thursday === true) {
            daysDue.push(4)
          }
          if (editChore.daysDue.friday === true) {
            daysDue.push(5)
          }
          if (editChore.daysDue.saturday === true) {
            daysDue.push(6)
          }

          let actualDue;
          let actualIdx = 0
            if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
              let laterDay = daysDue.filter((day, idx) => {
                  return moment(moment().add(1, 'day')).isBefore(moment(moment().add(1, 'day')).day(day, 'day'))
                })
              if (laterDay.length > 0) {
                actualIdx = daysDue.indexOf(laterDay[0])
                actualDue = moment().add(1, 'day').day(laterDay[0], 'day')
              } else {
                actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
              }
            } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
              actualIdx = 1
              actualDue = moment().add(1, 'day').day(daysDue[1], 'day')
            } else if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
              actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
            } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
              actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
            } else {
              actualDue = moment().add(1, 'day').day(daysDue[0], 'day')
            }

          editChore = {
            chore: editChore.chore,
            daysDue: {daysDue: daysDue},
            cycle: {cycleList: $scope.cycleList},
            currentAssigned: 0,
            currentDueDay: {currentDueDay: actualDue.format("YYYY-MM-DD"), currentDueIdx: actualIdx}
          }

          console.log(editChore);

          $http.put(API_URL.url + `/chores/updateChore/${$scope.choreId}`, editChore).then(result => {
            console.log('success');
            console.log(result);
            $state.go('tab.chores')
          })
        }


  }])
