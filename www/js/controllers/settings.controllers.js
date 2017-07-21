angular.module('app.settings.controllers', [])

  .controller('settingsCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', 'API_ENDPOINT', 'moment', function($scope, $state, $stateParams, $http, AuthService, API_ENDPOINT, moment) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.house;
      $scope.houseUsers = [];
      $scope.removeUserList = [];
      $scope.currentUser;

      $http.get('http://localhost:9000/users/user').then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id, house_id: result.data[0].house_id}
        $http.get(`http://localhost:9000/houses/house/${$scope.currentUser.house_id}`).then(function(houseInfo) {
          $scope.house = houseInfo.data[0]
          console.log(houseInfo);
        });
      });

      $http.get(`http://localhost:9000/users`).then(users => {
        $scope.houseUsers = users.data
        console.log('house users: ', $scope.houseUsers);
        $scope.removeUserList = $scope.houseUsers.filter(user => {
          return user.id != $scope.currentUser.id
        })
      })

    });

    $scope.removeHousemate = function (person) {
      console.log(person);
      $http.put(`http://localhost:9000/users/leave/${person.id}`)
    }

    $scope.leaveHouse = function () {
      $http.put(`http://localhost:9000/users/leave/${$scope.currentUser.id}`)
    }

    $scope.postMessage = function (msgText) {
      let newMsg = {content: msgText, postTime: moment.utc()}
      $http.post(`http://localhost:9000/messageboard`, newMsg).then(result => {
        $http.get(`http://localhost:9000/messageboard`).then(messages => {
          $scope.allMessages = messages.data
          $scope.allMessages.forEach(msg => {
            msg.postTime.postTime = moment(msg.postTime.postTime).format('dddd, MMMM do, YYYY h:mma')
            return msg.postTime.postTime
          })
        })
      })
    }

    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };
  }])
