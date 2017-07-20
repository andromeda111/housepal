angular.module('app.constants', [])

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  // This is used for Auth, and can be changed later to a more proper endpoint
  .constant('API_ENDPOINT', {
    url: 'https://g48cap.herokuapp.com/auth'
  });
