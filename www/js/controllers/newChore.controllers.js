angular.module('app.newChore.controllers', [])

  .controller('newChoreCtrl', ['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {

    $scope.$on('$ionicView.enter', function(e) {

      $scope.checked_housemates = [];
      $scope.cycleList = [];
      $scope.houseUsers = [];

      $http.get(`https://g48cap.herokuapp.com/users`).then(users => {
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

          newChore = {
            chore: newChore.chore,
            daysDue: {daysDue: daysDue},
            cycle: {cycleList: $scope.cycleList},
            currentAssigned: 0,
            currentDueDay: {currentDueDay: actualDue.format("YYYY-MM-DD"), currentDueIdx: actualIdx}
          }


          console.log(newChore);




          $http.post(`https://g48cap.herokuapp.com/chores/new`, newChore).then(result => {
            console.log('success');
            console.log(result);
            $state.go('tabsController.chores')
          })
        }

//WORKING
    // $scope.createChore = function (newChore) {
    //
    //   console.log(newChore);
    //   let daysDue = []
    //
    //   if (newChore.daysDue.sunday === true) {
    //     daysDue.push(0)
    //   }
    //   if (newChore.daysDue.monday === true) {
    //     daysDue.push(1)
    //   }
    //   if (newChore.daysDue.tuesday === true) {
    //     daysDue.push(2)
    //   }
    //   if (newChore.daysDue.wednesday === true) {
    //     daysDue.push(3)
    //   }
    //   if (newChore.daysDue.thursday === true) {
    //     daysDue.push(4)
    //   }
    //   if (newChore.daysDue.friday === true) {
    //     daysDue.push(5)
    //   }
    //   if (newChore.daysDue.saturday === true) {
    //     daysDue.push(6)
    //   }
    //
    //   let actualDue;
    //     if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
    //       actualDue = daysDue[1]
    //     } else if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(daysDue[0], 'day')) && daysDue.length > 1) {
    //     actualDue = daysDue[1]
    //   } else {
    //     actualDue = daysDue[0]
    //   }
    //
    //   newChore = {
    //     chore: newChore.chore,
    //     daysDue: {daysDue: daysDue},
    //     cycle: {cycleList: $scope.cycleList},
    //     currentAssigned: 0,
    //     currentDueDay: {currentDueDay: actualDue}
    //   }
    //
    //
    //   console.log(newChore);
    //   $http.post(`https://g48cap.herokuapp.com/chores/new`, newChore).then(result => {
    //     console.log('success');
    //     console.log(result);
    //     $state.go('tabsController.chores')
    //   })
    // }


  }])
