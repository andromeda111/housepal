angular.module('app.controllers', [])

.controller('choresCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('shoppingListCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

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

  $scope.updateItem = function (item) {
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

  $scope.deleteItem = function (item) {
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

.controller('messageBoardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
