angular.module('thriftyApp')
  .component('newgoal', {
    templateUrl: 'newgoal.template.html',
    controller: function ($http, $scope, $location) {
      $scope.sendData = function() {
        var data = {
          name: $scope.goal.name,
          cost: $scope.goal.cost
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
