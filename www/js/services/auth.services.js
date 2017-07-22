angular.module('app.auth.services', [])

  .service('AuthService', function($q, $http, API_URL, $ionicPush) {
    let LOCAL_TOKEN_KEY = 'yourTokenKey';
    let isAuthenticated = false;
    let authToken;

    function loadUserCredentials() {
      let token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      console.log('getting to storeUserCredentials');
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      console.log('getting to useCredentials');
      isAuthenticated = true;
      authToken = token;

      // Sets the token as header for requests
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    let register = function(newUser) {
      return $q(function(resolve, reject) {
        $http.post(API_URL.url + '/auth/signup', newUser).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    let login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_URL.url + '/auth/login', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    let logout = function() {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      login: login,
      register: register,
      logout: logout,
      storeUserCredentials: storeUserCredentials,
      isAuthenticated: function() {
        return isAuthenticated;
      },
    };
  })

  .factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function(response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
