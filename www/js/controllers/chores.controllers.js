angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$state', '$stateParams', '$http', 'API_URL', 'moment', function($scope, $state, $stateParams, $http, API_URL, moment) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.currentUser
      $scope.houseUsers = []
      $scope.allChores = []
      $scope.myChores = []
      $scope.otherChores = []
      $scope.currentDay = 'tuesday'
      $scope.working = false

      $http.get(API_URL.url + `/users/user`).then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}

        $http.get(API_URL.url + `/chores/house`).then(result => {
          $scope.allChores = result.data
          $scope.oneChore = result.data[0]
          $scope.myChores = $scope.allChores.filter(chore => {
            return chore.cycle.cycleList[chore.currentAssigned] === $scope.currentUser.id
          })
          $scope.otherChores = $scope.allChores.filter(chore => {
            return chore.cycle.cycleList[chore.currentAssigned] != $scope.currentUser.id
          })
        })
      })
      $http.get(API_URL.url + `/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
      })


      $scope.currentTime = moment().add(1, 'day').format("dddd, MMMM Do, YYYY")

    });

    $scope.findUserName = function (index) {
      return $scope.houseUsers.filter(user => {
        return user.id === index
      })[0].name
    }

    $scope.markDone = function (chore) {
      $http.put(API_URL.url + `/chores/done`, chore).then(result => {
        console.log(result);
      })
      $scope.postSysMsgComplete(chore)
    }

    $scope.editChore = function (chore) {
      let id = chore.id
      $state.go('tab.editChore', {id})
    }

    $scope.deleteChore = function (chore) {
      console.log(chore);
      $http.delete(API_URL.url + `/chores/delete/${chore.id}`).then(result => {
        console.log(result);
      })
    }

    $scope.postSysMsgComplete = function (chore) {
      let sysMsg = {
        posterId: 0,
        posterName: 'App Notification',
        content: `${$scope.currentUser.name} completed: "${chore.chore}"`,
        postTime: {postTime: moment.utc()}
      }
      $http.post(API_URL.url + `/messageboard/system`, sysMsg).then(result => {
        console.log(result);
      })
    }

  }])
