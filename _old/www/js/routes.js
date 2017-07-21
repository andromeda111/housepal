angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      // .state('tabsController.newChore', {
      //   url: '/chores/newChore',
      //   views: {
      //     'tab2': {
      //       templateUrl: 'templates/newChore.html',
      //       controller: 'newChoreCtrl'
      //     }
      //   }
      // })

      // .state('tabsController.editChore', {
      //   url: '/chores/editChore/{id}',
      //   views: {
      //     'tab2': {
      //       templateUrl: 'templates/editChore.html',
      //       controller: 'editChoreCtrl'
      //     }
      //   }
      // })
      //
      // .state('tabsController.chores', {
      //   url: '/chores',
      //   views: {
      //     'tab2': {
      //       templateUrl: 'templates/chores.html',
      //       controller: 'choresCtrl'
      //     }
      //   }
      // })


      // .state('tabsController.shoppingList', {
      //   url: '/shopping-list',
      //   views: {
      //     'tab3': {
      //       templateUrl: 'templates/shoppingList.html',
      //       controller: 'shoppingListCtrl'
      //     }
      //   }
      // })

      // .state('tabsController.messageBoard', {
      //   url: '/board',
      //   views: {
      //     'tab1': {
      //       templateUrl: 'templates/messageBoard.html',
      //       controller: 'messageBoardCtrl'
      //     }
      //   }
      // })

      // .state('tabsController.laundry', {
      //   url: '/laundry',
      //   views: {
      //     'tab4': {
      //       templateUrl: 'templates/laundry.html',
      //       controller: 'laundryCtrl'
      //     }
      //   }
      // })
      //
      // .state('tabsController.houseSettings', {
      //   url: '/houseSettings',
      //   views: {
      //     'tab9': {
      //       templateUrl: 'templates/houseSettings.html',
      //       controller: 'houseSettingsCtrl'
      //     }
      //   }
      // })
      //
      // .state('tabsController', {
      //   url: '/tabs',
      //   templateUrl: 'templates/tabsController.html',
      //   abstract: true
      // })

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

      .state('houseSetup', {
        url: '/house-setup',
        templateUrl: 'templates/houseSetup.html',
        controller: 'houseSetupCtrl'
      })

    $urlRouterProvider.otherwise('/login')

  })

  // Authentication check on state change
  .run(function($rootScope, $state, AuthService, AUTH_EVENTS, $ionicHistory) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
      if (!AuthService.isAuthenticated()) {
        console.log(next.name);
        if (next.name !== 'login' && next.name !== 'signup') {
          event.preventDefault();
          $state.go('login');
        }
      }
      // !!! Clears Chore Tab history when leaving Add Chore page - (decide on this later...)
      // if (fromState.name === 'tabsController.newChore') {
      //   $ionicHistory.clearHistory();
      // }
    });
  });
