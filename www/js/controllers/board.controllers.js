angular.module('app.board.controllers', [])

  .controller('messageBoardCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', 'API_ENDPOINT', 'moment', function($scope, $state, $stateParams, $http, AuthService, API_ENDPOINT, moment) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.allMessages = []
      $scope.houseUsers = [];
      $scope.housePushList = [];
      $scope.currentUser;
      $scope.testObj = {
        test: 'A',
        test2: 'b'
      }
      $http.get('https://g48cap.herokuapp.com/users/user').then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}
      });
      $http.get(`https://g48cap.herokuapp.com/users`).then(users => {
        $scope.houseUsers = users.data

        $scope.houseUsers.forEach(user => {
          console.log(user);
          $scope.housePushList.push(user.deviceId)
        })
        console.log($scope.housePushList);

      })
      $http.get(`https://g48cap.herokuapp.com/messageboard`).then(messages => {
        $scope.allMessages = messages.data
        $scope.allMessages.forEach(msg => {
          msg.postTime.postTime = moment(msg.postTime.postTime).format('dddd, MMMM do, YYYY h:mma')
          return msg.postTime.postTime
        })

      })
    });

    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });

    $scope.pushHouse = function () {
      let testMessage = {
        "tokens": $scope.housePushList,
        "profile": "capstone",
        "notification": {
            "message": "Hello World!"
          }
        }

      console.log(testMessage);
      // $http.post(`https://push.ionic.io/api/v1/push/notifications`, testMessage).then(result => {
      //   console.log(result);
      // })
    }


    $scope.postMessage = function (msgText) {
      let newMsg = {content: msgText, postTime: moment.utc()}
      $http.post(`https://g48cap.herokuapp.com/messageboard`, newMsg).then(result => {
        $http.get(`https://g48cap.herokuapp.com/messageboard`).then(messages => {
          $scope.allMessages = messages.data
          $scope.allMessages.forEach(msg => {
            msg.postTime.postTime = moment(msg.postTime.postTime).format('dddd, MMMM do, YYYY h:mma')
            return msg.postTime.postTime
          })
        })
      })
    }

  }])
