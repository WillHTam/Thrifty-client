angular.module('thriftyApp')
.component('newgoal', {
  templateUrl: 'newgoal.template.html',
  controller: function ($http, $scope, $location) {

    if (window.localStorage.auth_token == undefined) {
      $location.path('/')
    }

    $scope.first_name = window.localStorage.first_name
    $scope.last_name = window.localStorage.last_name

    // icons
    $scope.icons = ["graduation-cap", "home", "plane", "car", "bank", "gift", "shopping-bag"]

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
      var data = {
        icon: $scope.icons[$scope.index],
        name: $scope.goal.name,
        cost: $scope.goal.cost,
        amount_saved: 0
      }

      $http({
        method: 'POST',
        url: 'https://thrifty-app.herokuapp.com/newgoal',
        data: data,
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
    }
  }})
