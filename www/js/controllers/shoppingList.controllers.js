angular.module('app.shoppingList.controllers', [])

  .controller('shoppingListCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

    const api = 'http://localhost:9000/list'

    $scope.$on('$ionicView.enter', function(e) {
      console.log('on init');
      $scope.stuff = []
      $http.get(`${api}`).then(result => {
        console.log(result);
        $scope.stuff = result.data
      })
    });

    $scope.isActive = false;
    $scope.activeButton = function(id) {
      $scope.activeClass = id;
      console.log(id);
    };

    $scope.updateItem = function(item) {
      console.log(item);
      const id = item.id
      // const user = item['user_name']

      $http.put(`${api}/${id}`, item).then(res => {
        $http.get(`${api}`).then(result => {
          console.log(result);
          $scope.stuff = result.data
        })
      })
    }

    $scope.deleteItem = function(item) {
      const id = item.id
      $http.delete(`${api}/${id}`).then(res => {
        console.log('DELETED, BACK AT STATE: RES: ');
        console.log(res);
        $http.get(`${api}`).then(result => {
          console.log(result);
          $scope.stuff = result.data
        })
      })
    }
    // End Controller
  }])
