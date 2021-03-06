angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // Setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Tabs, Pages

  .state('tab.chores', {
    url: '/chores',
    views: {
      'tab-chores': {
        templateUrl: 'templates/chores.html',
        controller: 'choresCtrl'
      }
    }
  })
    .state('tab.newChore', {
      url: '/chores/new-chore',
      views: {
        'tab-chores': {
          templateUrl: 'templates/new-chore.html',
          controller: 'newChoreCtrl'
        }
      }
    })
    .state('tab.editChore', {
      url: '/chores/edit-chore/{id}',
      views: {
        'tab-chores': {
          templateUrl: 'templates/edit-chore.html',
          controller: 'editChoreCtrl'
        }
      }
    })

  .state('tab.shoppingList', {
      url: '/shopping-list',
      views: {
        'tab-shopping-list': {
          templateUrl: 'templates/shopping-list.html',
          controller: 'shoppingListCtrl'
        }
      }
    })

  .state('tab.messageBoard', {
    url: '/board',
    views: {
      'tab-board': {
        templateUrl: 'templates/board.html',
        controller: 'messageBoardCtrl'
      }
    }
  })

  .state('tab.laundry', {
    url: '/laundry',
    views: {
      'tab-laundry': {
        templateUrl: 'templates/laundry.html',
        controller: 'laundryCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
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

  .state('houseSetup', {
    url: '/house-setup',
    templateUrl: 'templates/house-setup.html',
    controller: 'houseSetupCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

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
  });
});
