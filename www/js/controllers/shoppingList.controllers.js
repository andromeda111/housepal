angular.module('app.shoppingList.controllers', [])

  .controller('shoppingListCtrl', ['$scope', '$stateParams', '$http', 'moment', 'API_URL', function($scope, $stateParams, $http, moment, API_URL) {

    $scope.$on('$ionicView.enter', function(e) {
      console.log('on init');
      $scope.listItems = []

      $scope.currentUser;
      $http.get(API_URL.url + `/users/user`).then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}
      });

      $http.get(API_URL.url + `/list`).then(result => {
        $scope.listItems = result.data

        $http.get(API_URL.url + `/users`).then(users => {
          $scope.houseUsers = users.data
        })
      })
    });

    $scope.isActive = false;
    $scope.activeButton = function(id) {
      $scope.activeClass = id;
      console.log(id);
    };

    $scope.addItem = function(newItem) {
      console.log(newItem);
      $http.post(API_URL.url + `/list`, {newItem}).then(() => {
        $http.get(API_URL.url + `/list`).then(result => {
          $scope.listItems = result.data
        })
      })
      $scope.postSysMsgAdd(newItem)
      $scope.pushMsgNotifyAdd(newItem)
      this.newItem = '';
      // $scope.shoppingListForm.$setUntouched();
      // $scope.shoppingListForm.$setPristine();
    }

    $scope.updateItem = function(item, buyer) {
      const id = item.id

      $http.put(API_URL.url + `/list/${id}`, {buyer}).then(res => {
        $http.get(API_URL.url + `/list`).then(result => {
          $scope.listItems = result.data
        })
      })
    }

    $scope.deleteItem = function(item) {
      const id = item.id
      $http.delete(API_URL.url + `/list/${id}`).then(res => {
        $http.get(API_URL.url + `/list`).then(result => {
          $scope.listItems = result.data
        })
      })
    }

    $scope.purchasedItem = function(item) {
      const id = item.id
      $http.delete(API_URL.url + `/list/${id}`).then(res => {
        $http.get(API_URL.url + `/list`).then(result => {
          $scope.listItems = result.data
        })
      })
      console.log('before function link');
      $scope.postSysMsgPurchased(item)
    }

    $scope.postSysMsgAdd = function (item) {
      let sysMsg = {
        posterId: 0,
        posterName: 'App Notification',
        content: `${$scope.currentUser.name} added "${item}" to the communal shopping list.`,
        postTime: {postTime: moment.utc()}
      }
      $http.post(API_URL.url + `/messageboard/system`, sysMsg).then(result => {
        console.log(result);
      })
    }

    $scope.postSysMsgPurchased = function (item) {
      let sysMsg = {
        posterId: 0,
        posterName: 'App Notification',
        content: `${$scope.currentUser.name} bought "${item.item}". Thanks, ${$scope.currentUser.name}!`,
        postTime: {postTime: moment.utc()}
      }
      $http.post(API_URL.url + `/messageboard/system`, sysMsg).then(result => {
        console.log(result);
      })
    }


    /*************
    Push Notifications
    *************/
    $scope.pushMsgNotifyAdd = function (newItem) {
      let pushSendList = []
      $scope.houseUsers.forEach(user => {
        if (user.id != $scope.currentUser.id) {
          pushSendList.push(user.deviceId)
        }
      })

      let req = {
           method: 'POST',
           url: 'https://api.ionic.io/push/notifications',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NDIwMDgzOS1iM2VhLTRiMzctOTY3Zi0zMWQyYmRlMWVhOTkifQ.RatHfDaE0PbgPHqxLONRpAg7f5EZ95R5mJu4jn5cbnk'
           },
           data: {
              "tokens": pushSendList,
              "profile": "housepal",
              "notification": {
                "android": {
                  "title": "Communal Shopping List",
                  "message": `"${newItem}" added to shopping list.`,
                  "priority": "normal"
                }
              }
            }
          }

      $http(req).then(result => {
        console.log(result);
      })
    }
    // End Controller
  }])
