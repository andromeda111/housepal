angular.module('app', ['ionic', 'app.menu.controllers', 'app.auth.controllers', 'app.houseSetup.controllers', 'app.chores.controllers', 'app.newChore.controllers', 'app.shoppingList.controllers', 'app.board.controllers', 'app.routes', 'app.directives', 'app.services', 'app.auth.services', 'app.constants'])

  // COMMENTED OUT -- Initial config from app setup - may or may not need. Keep for now.
  // .config(function($ionicConfigProvider, $sceDelegateProvider){
  //
  //   $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  //
  // })

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
  });
