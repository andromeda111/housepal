angular.module('app.houseSetup.controllers', [])

  .controller('houseSetupCtrl', ['$scope', '$stateParams', '$state', '$http', 'AuthService', 'API_URL', function($scope, $stateParams, $state, $http, AuthService, API_URL) {

      $scope.$on('$ionicView.enter', function(e) {
        console.log('on init');
        $scope.hideIntro = true
      });

      $scope.joinButton = function() {
        $scope.showJoinContainer = true
        $scope.hideIntro = false
      }

      $scope.createButton = function() {
        $scope.showCreateContainer = true
        $scope.hideIntro = false
      }

      $scope.joinFormSubmit = function (joinFormData) {
        $http.post(API_URL.url + `/houses/join`, joinFormData).then(result => {
          AuthService.storeUserCredentials(result.data.newToken);
          $state.go('tab.messageBoard')
        }).catch(err => {
          $scope.joinError = {text: 'try again, house doesnt exist', msg: err.data.msg}
        })
      }

      $scope.createFormSubmit = function (createFormData) {
        $http.post(API_URL.url + `/houses/create`, createFormData).then(result => {
          AuthService.storeUserCredentials(result.data.newToken);
          $state.go('tab.messageBoard')
        }).catch(err => {
          $scope.createError = {text: 'try again, house already exists', msg: err.data.msg, err: err.data.err.detail}
        })
      }

  }])
