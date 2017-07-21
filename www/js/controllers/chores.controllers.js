angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$state', '$stateParams', '$http', 'moment', function($scope, $state, $stateParams, $http, moment) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.allChores = []
      $scope.houseUsers = [];
      $scope.currentDay = 'tuesday'
      $scope.working = false
      $scope.currentUser;

      $http.get('http://localhost:9000/users/user').then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}
      });
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
      $scope.postSysMsgComplete(chore)
    }

    $scope.editChore = function (chore) {
      let id = chore.id
      $state.go('tab.editChore', {id})
    }

    $scope.deleteChore = function (chore) {
      console.log(chore);
      $http.delete(`http://localhost:9000/chores/delete/${chore.id}`).then(result => {
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
      $http.post(`http://localhost:9000/messageboard/system`, sysMsg).then(result => {
        console.log(result);
      })
    }

  }])
