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
      $scope.currentTime = moment().day(1).format("dddd, MMMM Do")

    });

    $scope.findUserName = function (index) {
      return $scope.houseUsers.filter(user => {
        return user.id === index
      })[0].name
    }

    $scope.markDone = function (chore) {

      // let resetChore = chore
      //
      // // Cycle to Next Due day
      // if (resetChore.daysDue.daysDue.length > 1) {
      //   if (resetChore.currentDueDay.) {
      //
      //   }
      // }
      // id: 1,
      // chore: 'Clean Kitchen Counters',
      // daysDue: {daysDue: [true, false, false, false, false, false, false]},
      // cycle: {cycleList: [1]},
      // currentDueDay: {null: null},
      // currentAssigned: 0,
      // dueToday: false,
      // done: false,
      // late: false,
      // house_id: 1



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
