angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$state', '$stateParams', '$http', 'moment', function($scope, $state, $stateParams, $http, moment) {

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

    $scope.editChore = function (chore) {
      let id = chore.id
      $state.go('tabsController.editChore', {id})
    }

    $scope.deleteChore = function (chore) {
      console.log(chore);
      $http.delete(`http://localhost:9000/chores/delete/${chore.id}`).then(result => {
        console.log(result);
      })
    }


  }])
