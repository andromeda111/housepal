angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$stateParams', '$http', 'moment', function($scope, $stateParams, $http, moment) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.allChores = []
      $scope.houseUsers = [];
      $scope.currentDay = 'tuesday'
      $scope.working = false

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
      })
      $http.get(`http://localhost:9000/chores/house`).then(result => {
        $scope.allChores = result.data
        $scope.oneChore = result.data[0]
      })
      $scope.currentTime = moment().add(1, 'day').format("dddd, MMMM Do")

    });

    $scope.findUserName = function (index) {
      return $scope.houseUsers.filter(user => {
        return user.id === index
      })[0].name
    }

    $scope.markDone = function (chore) {
      $http.put(`http://localhost:9000/chores/done`, chore).then(result => {
        console.log(result);
      })
    }

    $scope.DONESTUFF = function (chore) {

      let doneChore = chore
      let nextDueIdx = 0

      // Get the Index of the next due day
      if (doneChore.daysDue.length > 1) {
        if (!doneChore.daysDue[doneChore.currentDueDay.currentDueIdx + 1]) {
          nextDueIdx = 0
        } else {
          nextDueIdx = doneChore.indexOf(doneChore.daysDue[doneChore.currentDueDay.currentDueIdx + 1])
        }
      }

      // If Marked Done *before* due date has passed -- MAYBE DONT NEED
      if (!moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(doneChore.currentDueDay, 'day'))) {
        doneChore.done = true
        doneChore.late = false
      }

      // If today is After the current due date:
      if (moment(moment().add(1, 'day')).isAfter(moment(moment().add(1, 'day')).day(doneChore.currentDueDay, 'day'))) {
        // Cycle day: If the next due date is the same day as the current day
          if (moment(moment().add(1, 'day')).isSame(moment(moment().add(1, 'day')).day(doneChore.daysDue[nextDueIdx], 'day'))) {
            doneChore.dueToday = true
          }
          if (doneChore.daysDue.length > 0) {
            doneChore.currentDueDay.currentDueDay = moment().add(1, 'day').day(doneChore.daysDue[nextDueIdx], 'day')
          } else {
            doneChore.currentDueDay.currentDueDay = moment().add(1, 'weeks').day(doneChore.daysDue[nextDueIdx], 'day')
          }
        // Cycle day: If the next due date is after the current day




      }



      // $http.put(`http://localhost:9000/chores/done/${id}`).then(result => {
      //   console.log(result);
      //   // var delIdx = $scope.allChores.map(obj => obj.id).indexOf(id);
      //   // $scope.allChores.splice(delIdx, 1)
      //
      // })
    }





    // $scope.format = function (due) {
    //   console.log('moment weekday: ', moment().day(due));
    //   let result;
    //   // if we haven't yet passed the day of the week that I need:
    //   if (moment(moment().add(1, 'day')).isSame(moment().day(due, 'day'))) {
    //     console.log('same day');
    //     result = moment()
    //   } else if (moment(moment().add(1, 'day')).isBefore(moment().day(due))) {
    //     // then just give me this week's instance of that day
    //     console.log(moment().weekday(due));
    //     console.log('before');
    //      result = moment().weekday(due);
    //   } else {
    //     console.log('after');
    //     // otherwise, give me next week's instance of that day
    //     result = moment().add(1, 'weeks').weekday(due);
    //   }
    //   return result.format("dddd, MMMM Do").toString()
    // }

    // WORKING
    // $scope.format = function (due) {
    //   console.log('moment weekday: ', moment().day(due));
    //   let result;
    //   // if we haven't yet passed the day of the week that I need:
    //   if (moment(moment().add(1, 'day')).isSame(moment().day(due, 'day'))) {
    //     console.log('same day');
    //     result = moment()
    //   } else if (moment(moment().add(1, 'day')).isBefore(moment().day(due))) {
    //     // then just give me this week's instance of that day
    //     console.log(moment().weekday(due));
    //     console.log('before');
    //      result = moment().weekday(due);
    //   } else {
    //     console.log('after');
    //     // otherwise, give me next week's instance of that day
    //     result = moment().add(1, 'weeks').weekday(due);
    //   }
    //   return result.format("dddd, MMMM Do")
    // }

    $scope.setDay = function () {

    }

    $scope.changeDay = function () {

    }

  }])
