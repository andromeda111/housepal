angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.chores', {
    url: '/chores',
    views: {
      'tab2': {
        templateUrl: 'templates/chores.html',
        controller: 'choresCtrl'
      }
    }
  })

  .state('tabsController.shoppingList', {
    url: '/shopping-list',
    views: {
      'tab3': {
        templateUrl: 'templates/shoppingList.html',
        controller: 'shoppingListCtrl'
      }
    }
  })

  .state('tabsController.messageBoard', {
    url: '/board',
    views: {
      'tab1': {
        templateUrl: 'templates/messageBoard.html',
        controller: 'messageBoardCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/tabs/board')


});