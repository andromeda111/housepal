angular.module('app.laundry.controllers', [])

  .controller('laundryCtrl', ['$scope', '$stateParams', '$http', 'moment', function($scope, $stateParams, $http, moment) {

    const api = 'http://localhost:9000'

    $scope.$on('$ionicView.enter', function(e) {
      console.log('on init');
      $scope.listItems = []

      $scope.currentUser;
      $scope.washerTimeAgo;
      $scope.dryerTimeAgo;
      $http.get('http://localhost:9000/users/user').then(function(result) {
        $scope.currentUser = {name: result.data[0].name, id: result.data[0].id, house_id: result.data[0].house_id, deviceId: result.data[0].deviceId}
      });

      $scope.laundryData;

      $http.get('http://localhost:9000/laundry').then(function(result) {
        $scope.laundryData = result.data[0]
        if ($scope.laundryData.washer_start_time.time) {
          $scope.washerTimeAgo = moment($scope.laundryData.washer_start_time.time).fromNow()
        }
        if ($scope.laundryData.dryer_start_time.time) {
          $scope.dryerTimeAgo = moment($scope.laundryData.dryer_start_time.time).fromNow()
        }
      });
    });

    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });

    /*************
    WasherLogic
    *************/
    $scope.toggleWasherOn = function () {
      let washerToggleOn = {
        washer_status: true,
        washer_current_user: {id: $scope.currentUser.id, name: $scope.currentUser.name},
        washer_start_time: {time: moment.utc()}
      }
      $http.put(`http://localhost:9000/laundry/on/${$scope.currentUser.house_id}`, washerToggleOn).then(result => {
        console.log(result);
        $http.get('http://localhost:9000/laundry').then(function(result) {
          $scope.laundryData = result.data[0]
          $scope.washerTimeAgo = moment($scope.laundryData.washer_start_time.time).fromNow()
        });
      })
    }

    $scope.toggleWasherOff = function () {
      let washerToggleOff = {
        washer_status: false,
        washer_current_user: {id: null, name: null},
        washer_start_time: {time: null},
        washer_notify: {users: null}
      }
      $http.get('http://localhost:9000/laundry').then(function(result) {
        let washerNotifyList = result.data[0].washer_notify.users
        if (washerNotifyList.length > 0) {
          $scope.pushMsgNotifyWasher(washerNotifyList)
        }
      })

      $http.put(`http://localhost:9000/laundry/on/${$scope.currentUser.house_id}`, washerToggleOff).then(result => {
        console.log(result);
        $http.get('http://localhost:9000/laundry').then(function(result) {
          $scope.laundryData = result.data[0]
          $scope.washerTimeAgo = null
        });
      })
    }

    $scope.notifyMeWasher = function() {

      $http.get('http://localhost:9000/laundry').then(function(result) {
        let notifyList = result.data[0].washer_notify.users
        let user = $scope.currentUser.deviceId
        let notifyObj = {}
        if (notifyList) {
          if (!notifyList.includes(user)) {
            notifyList.push(user)
            notifyObj = {
              washer_notify: {users: notifyList}
            }
            $http.put(`http://localhost:9000/laundry/notify/${$scope.currentUser.id}`, notifyObj).then(result => {
              console.log(result);
            })
          }
        } else {
          notifyList = [user]
          notifyObj = {
            washer_notify: {users: notifyList}
          }
          $http.put(`http://localhost:9000/laundry/notify/${$scope.currentUser.id}`, notifyObj).then(result => {
            console.log(result);
          })
        }
      });


    }

    /*************
    Dryer Logic
    *************/
    $scope.toggleDryerOn = function () {
      let dryerToggleOn = {
        dryer_status: true,
        dryer_current_user: {id: $scope.currentUser.id, name: $scope.currentUser.name},
        dryer_start_time: {time: moment.utc()}
      }
      $http.put(`http://localhost:9000/laundry/on/${$scope.currentUser.house_id}`, dryerToggleOn).then(result => {
        console.log(result);
        $http.get('http://localhost:9000/laundry').then(function(result) {
          $scope.laundryData = result.data[0]
          $scope.dryerTimeAgo = moment($scope.laundryData.dryer_start_time.time).fromNow()
        });
      })
    }

    $scope.toggleDryerOff = function () {
      let dryerToggleOff = {
        dryer_status: false,
        dryer_current_user: {id: null, name: null},
        dryer_start_time: {time: null},
        dryer_notify: {users: null}
      }
      $http.get('http://localhost:9000/laundry').then(function(result) {
        let dryerNotifyList = result.data[0].dryer_notify.users
        if (dryerNotifyList) {
          $scope.pushMsgNotifyDryer(dryerNotifyList)
        }
      })

      $http.put(`http://localhost:9000/laundry/on/${$scope.currentUser.house_id}`, dryerToggleOff).then(result => {
        console.log(result);
        $http.get('http://localhost:9000/laundry').then(function(result) {
          $scope.laundryData = result.data[0]
          $scope.dryerTimeAgo = null
        });
      })
    }

    $scope.notifyMeDryer = function() {

      $http.get('http://localhost:9000/laundry').then(function(result) {
        let notifyList = result.data[0].dryer_notify.users
        let user = $scope.currentUser.deviceId
        let notifyObj = {}
        if (notifyList) {
          if (!notifyList.includes(user)) {
            notifyList.push(user)
            notifyObj = {
              dryer_notify: {users: notifyList}
            }
            $http.put(`http://localhost:9000/laundry/notify/${$scope.currentUser.id}`, notifyObj).then(result => {
              console.log(result);
            })
          }
        } else {
          notifyList = [user]
          notifyObj = {
            dryer_notify: {users: notifyList}
          }
          $http.put(`http://localhost:9000/laundry/notify/${$scope.currentUser.id}`, notifyObj).then(result => {
            console.log(result);
          })
        }
      });


    }



    /*************
    Push Notifications
    *************/
    $scope.pushMsgNotifyWasher = function (washerNotifyList) {
      let req = {
           method: 'POST',
           url: 'https://api.ionic.io/push/notifications',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNjVlYzE2YS04N2VmLTQ3YjQtOGJlYy1mY2ZmZWJmMjc0ZTQifQ.aqtWe4lI7BmoSqAZCl0VD-H3Ceo1BVAOFgtpLhHD8OM'
           },
           data: {
              "tokens": washerNotifyList,
              "profile": "capstone",
              "notification": {
                "android": {
                  "title": "Washer Available",
                  "message": "The washer is now available for use.",
                  "priority": "high"
                }
              }
            }
          }

      $http(req).then(result => {
        console.log(result);
      })
    }

    $scope.pushMsgNotifyDryer = function (dryerNotifyList) {
      let req = {
           method: 'POST',
           url: 'https://api.ionic.io/push/notifications',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNjVlYzE2YS04N2VmLTQ3YjQtOGJlYy1mY2ZmZWJmMjc0ZTQifQ.aqtWe4lI7BmoSqAZCl0VD-H3Ceo1BVAOFgtpLhHD8OM'
           },
           data: {
              "tokens": dryerNotifyList,
              "profile": "capstone",
              "notification": {
                "android": {
                  "title": "Dryer Available",
                  "message": "The dryer is now available for use.",
                  "priority": "high"
                }
              }
            }
          }

      $http(req).then(result => {
        console.log(result);
      })
    }
    // End Controller
  }])
