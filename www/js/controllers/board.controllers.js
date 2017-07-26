angular.module('app.board.controllers', [])

  .controller('messageBoardCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', 'API_URL', 'moment', '$ionicScrollDelegate', function($scope, $state, $stateParams, $http, AuthService, API_URL, moment, $ionicScrollDelegate) {
    $scope.$on('$ionicView.enter', function(e) {


      $scope.allMessages = []
      $scope.houseUsers = [];
      $scope.housePushList = [];
      $scope.currentUser;
      $scope.testObj = {
        test: 'A',
        test2: 'b'
      }
      $http.get(API_URL.url + `/users/user`).then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}
      });
      $http.get(API_URL.url + `/users`).then(users => {
        $scope.houseUsers = users.data

        $scope.houseUsers.forEach(user => {
          console.log(user);
          $scope.housePushList.push(user.deviceId)
        })
        console.log($scope.housePushList);

      })
      $http.get(API_URL.url + `/messageboard`).then(messages => {
        $scope.allMessages = messages.data
        $scope.allMessages.forEach(msg => {
          msg.postTime.postTime = moment(msg.postTime.postTime).format('MMMM Do, YYYY - h:mma')
          $ionicScrollDelegate.scrollBottom()
          return msg.postTime.postTime
        })

      })
    });

    $scope.$on('cloud:push:notification', function(event, data) {
      let msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });

    $scope.pushHouse = function () {

      let req = {
           method: 'POST',
           url: 'https://api.ionic.io/push/notifications',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NDIwMDgzOS1iM2VhLTRiMzctOTY3Zi0zMWQyYmRlMWVhOTkifQ.RatHfDaE0PbgPHqxLONRpAg7f5EZ95R5mJu4jn5cbnk'
           },
           data: {
              "tokens": $scope.housePushList,
              "profile": "housepal",
              "notification": {
                "title": "Hi",
                "message": "Hello world!",
                "android": {
                  "title": "Hey",
                  "message": "Hello Android!"
                },
                "ios": {
                  "title": "Howdy",
                  "message": "Hello iOS!"
                }
              }
            }
          }

      $http(req).then(result => {
        console.log(result);
      })
    }

    $scope.postMessage = function (msgText) {
      let newMsg = {content: msgText, postTime: moment.utc()}
      $http.post(API_URL.url + `/messageboard`, newMsg).then(result => {
        $http.get(API_URL.url + `/messageboard`).then(messages => {
          $scope.allMessages = messages.data
          $scope.allMessages.forEach(msg => {
            msg.postTime.postTime = moment(msg.postTime.postTime).format('MMMM Do, YYYY - h:mma')
            $ionicScrollDelegate.scrollBottom()
            return msg.postTime.postTime
          })
        })
      })
      this.msgText = '';
      $scope.boardPostForm.$setUntouched();
      $scope.boardPostForm.$setPristine();
    }

  }])
