angular.module('app.constants', [])

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  // This is used for Auth, and can be changed later to a more proper endpoint
  .constant('API_ENDPOINT', {
    url: 'http://localhost:9000/auth'
  });
