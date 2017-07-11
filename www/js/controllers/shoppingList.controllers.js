angular.module('app.shoppingList.controllers', [])

  .controller('shoppingListCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    const api = 'http://localhost:9000'

    $scope.$on('$ionicView.enter', function(e) {
      console.log('on init');
      $scope.listItems = []
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
        console.log('DELETED, BACK AT STATE: RES: ');
        console.log(res);
        $http.get(`${api}/list`).then(result => {
          console.log(result);
          $scope.listItems = result.data
        })
      })
    }
    // End Controller
  }])
