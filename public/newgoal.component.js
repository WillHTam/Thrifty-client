angular.module('thriftyApp')
  .component('newgoal', {
    templateUrl: 'newgoal.template.html',
    controller: function ($http, $scope, $location) {
      $scope.sendData = function() {
        var data = {
          name: $scope.newgoal.name,
          cost: $scope.newgoal.cost
        }

        $http({
          method: 'POST',
          url: 'https:thrifty-app.herokuapp.com/newgoal',
          data: data,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('email', window.localStorage['email'])
            xhr.setRequestHeader('auth_token', window.localStorage['auth_token'])
            // ADD CUTE WAITING UI HERE
          }
        })
        .success( function (data) {
          console.log(data)
          $location.path("/goalplan")
        })
      }
  }})
