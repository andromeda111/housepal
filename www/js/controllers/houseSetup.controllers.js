angular.module('app.houseSetup.controllers', [])

  .controller('houseSetupCtrl', ['$scope', '$stateParams', '$state', '$http', function($scope, $stateParams, $state, $http) {

      $scope.$on('$ionicView.enter', function(e) {
        console.log('on init');
        $scope.hideIntro = true
      });

      $scope.step1 = function() {
        $scope.showJoinContainer = true
        $scope.hideIntro = false
      }

      $scope.joinFormSubmit = function (joinFormCode) {
        console.log(joinFormCode);
        $http.post('http://localhost:9000/houses/join', {joinFormCode}).then(result => {
          console.log('returned from post, success');
          console.log(result.status, result.data.msg);
          $state.go('tabsController.messageBoard')
        }).catch(err => {
          console.log(err);
          console.log(err.status, err.data.msg);
        })
      }

  }])
