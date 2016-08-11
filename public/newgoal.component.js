angular.module('thriftyApp')
.component('newgoal', {
  templateUrl: 'newgoal.template.html',
  controller: function ($http, $scope, $location) {

    // UNAUTHORISED ENTRY
    if (window.localStorage.auth_token == undefined) {
      $location.path('/')
    }

    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/user',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      console.log(response)
      $scope.first_name = response.first_name
      $scope.last_name = response.last_name
    })

    $scope.goEdit = function () {
      console.log('button pressed')
      $location.path('/account')
    }

    // icons
    $scope.icons = ["pied-piper", "graduation-cap", "home", "paw", "plane", "car", "bank", "gift", "shopping-bag"]

    $scope.index = 0
    $scope.prev = function() {
      if ($scope.index === 0) {
        $scope.index = $scope.icons.length - 1;
      }
      else {
        $scope.index -= 1;
      }
      console.log($scope.icons[$scope.index])
    }
    $scope.next = function() {
      $scope.index += 1;
      if ($scope.index === $scope.icons.length) {
        $scope.index = 0;
      }
      console.log($scope.icons[$scope.index])
    }

    $scope.sendData = function() {

      // UPDATE GOAL
      var goalData = {
        icon: $scope.icons[$scope.index],
        name: $scope.goal.name,
        cost: $scope.goal.cost,
        amount_saved: 0
      }

      $http({
        method: 'POST',
        url: 'https://thrifty-app.herokuapp.com/newgoal',
        data: goalData,
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token},
        beforeSend: function (xhr) {
          xhr.setRequestHeader('email', window.localStorage.email)
          xhr.setRequestHeader('auth_token', window.localStorage.auth_token)
          // ADD CUTE WAITING UI HERE
        }
      })
      .success( function (data) {
        console.log("Goal created! " + data)
        $location.path("/goalplan")
      })

    } // end sendData()
  }})
