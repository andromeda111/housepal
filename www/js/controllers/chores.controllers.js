angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.allChores = []
      $scope.houseUsers = [];
      $scope.currentDay = 'tuesday'

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
      })
      $http.get(`http://localhost:9000/chores/house`).then(result => {
        $scope.allChores = result.data
        $scope.oneChore = result.data[0]
      })






    });

    $scope.findUserName = function (index) {
      return $scope.houseUsers.filter(user => {
        return user.id === index
      })[0].name
    }

    $scope.setDay = function () {

    }

    $scope.changeDay = function () {

    }

  }])
