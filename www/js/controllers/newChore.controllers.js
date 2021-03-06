angular.module('app.newChore.controllers', [])

  .controller('newChoreCtrl', ['$scope', '$stateParams', '$http', '$state', 'API_URL', function($scope, $stateParams, $http, $state, API_URL) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.checked_housemates = [];
      $scope.cycleList = [];
      $scope.houseUsers = [];

      $http.get(API_URL.url + `/users`).then(users => {
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
          let actualIdx = 0
            if (moment(moment().add(0, 'day')).isAfter(moment(moment().add(0, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
              let laterDay = daysDue.filter((day, idx) => {
                  return moment(moment().add(0, 'day')).isBefore(moment(moment().add(0, 'day')).day(day, 'day'))
                })
              if (laterDay.length > 0) {
                actualIdx = daysDue.indexOf(laterDay[0])
                actualDue = moment().add(0, 'day').day(laterDay[0], 'day')
              } else {
                actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
              }
            } else if (moment(moment().add(0, 'day')).isSame(moment(moment().add(0, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
              actualIdx = 1
              actualDue = moment().add(0, 'day').day(daysDue[1], 'day')
            } else if (moment(moment().add(0, 'day')).isAfter(moment(moment().add(0, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
              actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
            } else if (moment(moment().add(0, 'day')).isSame(moment(moment().add(0, 'day')).day(daysDue[0], 'day')) && daysDue.length == 1) {
              actualDue = moment().add(1, 'weeks').weekday(daysDue[0]);
            } else {
              actualDue = moment().add(0, 'day').day(daysDue[0], 'day')
            }

          newChore = {
            chore: newChore.chore,
            daysDue: {daysDue: daysDue},
            cycle: {cycleList: $scope.cycleList},
            currentAssigned: 0,
            currentDueDay: {currentDueDay: actualDue.format("YYYY-MM-DD"), currentDueIdx: actualIdx}
          }

          console.log(newChore);

          $http.post(API_URL.url + `/chores/new`, newChore).then(result => {
            console.log('success');
            console.log(result);
            $state.go('tab.chores')
          })
        }
        // End Controller
  }])
