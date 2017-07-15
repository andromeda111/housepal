angular.module('app.chores.controllers', [])

  .controller('choresCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.allChores = []
      $http.get(`http://localhost:9000/chores/house`).then(result => {
        $scope.allChores = result.data
        $scope.oneChore = result.data[0]
      })


      $scope.currentDay = 'Sunday'
      $scope.weekArr = [true, false, false, false, false, false, false]
      // $scope.dueDays = [false, false, true, false, false, false, false]
      // $scope.setDay()

    
    });

    $scope.setDay = function () {

    }

    $scope.changeDay = function () {

    }

  }])
