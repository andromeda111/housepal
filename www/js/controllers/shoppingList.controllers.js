angular.module('app.shoppingList.controllers', [])

  .controller('shoppingListCtrl', ['$scope', '$stateParams', '$http', 'moment', function($scope, $stateParams, $http, moment) {

    const api = 'http://localhost:9000'

    $scope.$on('$ionicView.enter', function(e) {
      console.log('on init');
      $scope.listItems = []

      $scope.currentUser;
      $http.get('http://localhost:9000/users/user').then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id}
      });

      $http.get(`${api}/list`).then(result => {
        $scope.listItems = result.data

        $http.get(`${api}/users`).then(users => {
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
      $http.post(`${api}/list`, {newItem}).then(() => {
        $http.get(`${api}/list`).then(result => {
          $scope.listItems = result.data
        })
      })
      $scope.postSysMsgAdd(newItem)
    }

    $scope.updateItem = function(item, buyer) {
      const id = item.id

      $http.put(`${api}/list/${id}`, {buyer}).then(res => {
        $http.get(`${api}/list`).then(result => {
          $scope.listItems = result.data
        })
      })
    }

    $scope.deleteItem = function(item) {
      const id = item.id
      $http.delete(`${api}/list/${id}`).then(res => {
        $http.get(`${api}/list`).then(result => {
          $scope.listItems = result.data
        })
      })
    }

    $scope.purchasedItem = function(item) {
      const id = item.id
      $http.delete(`${api}/list/${id}`).then(res => {
        $http.get(`${api}/list`).then(result => {
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
      $http.post(`http://localhost:9000/messageboard/system`, sysMsg).then(result => {
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
      $http.post(`http://localhost:9000/messageboard/system`, sysMsg).then(result => {
        console.log(result);
      })
    }
    // End Controller
  }])
