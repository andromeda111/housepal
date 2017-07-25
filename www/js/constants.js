angular.module('app.constants', [])

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  // This is used for Auth
  .constant('API_URL', {
    url: 'https://housepal.herokuapp.com'
  });
