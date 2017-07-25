// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ionic.cloud', 'app.auth.controllers', 'app.houseSetup.controllers', 'app.chores.controllers', 'app.newChore.controllers', 'app.editChore.controllers', 'app.shoppingList.controllers', 'app.board.controllers', 'app.settings.controllers', 'app.laundry.controllers', 'app.routes', 'app.directives', 'app.services', 'app.auth.services', 'app.constants', 'angularMoment', 'luegg.directives'])

.config(function($ionicCloudProvider, $ionicConfigProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "af5b2177"
    },
    "push": {
    "sender_id": "879269429683",
    "pluginConfig": {
      "ios": {
        "badge": true,
        "sound": true
      },
      "android": {
        "iconColor": "#343434"
      }
    }
  }
  });

  $ionicConfigProvider.navBar.alignTitle('center')
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
