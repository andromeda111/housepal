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

      console.log($scope.weekArr.toString());
    });

    $scope.setDay = function () {
      let test = $scope.weekArr.map((el, idx, collec) => {
        console.log(el);
        console.log($scope.currentDay );
        el = false
        if ($scope.currentDay === 'Sunday') {
          console.log('sun');
          el = true
        } else if ($scope.currentDay === 'Monday') {
          console.log('mon');
          el = true
        } else if ($scope.currentDay === 'Tuesday') {
          console.log('tue');
          el = true
        } else if ($scope.currentDay === 'Wednesday') {
          console.log('wed');
          el = true
        } else if ($scope.currentDay === 'Thursday') {
          console.log('thu');
          el = true
        } else if ($scope.currentDay === 'Friday') {
          console.log('fri');
          el = true
        } else if ($scope.currentDay === 'Saturday') {
          console.log('sat');
          el = true
        } else {
          el === false
        }

        return el
      })

      console.log('setday result:');
      console.log($scope.weekArr);
      return test
    }

    $scope.changeDay = function () {
      $scope.currentDay = 'Tuesday'
      $scope.weekArr = $scope.setDay()

      // let old = $scope.weekArr.indexOf(true)
      // if ($scope.weekArr.length -1 == old) {
      //   $scope.weekArr[0] = true
      //   $scope.weekArr[old] = false
      //   old = 0
      // } else {
      //   $scope.weekArr[old + 1] = true
      //   $scope.weekArr[old] = false
      // }
      console.log('changeday result:');
      console.log($scope.weekArr.toString());
    }

  }])
