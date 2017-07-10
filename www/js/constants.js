angular.module('app.constants', [])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
  url: 'http://localhost:9000/auth'
});
