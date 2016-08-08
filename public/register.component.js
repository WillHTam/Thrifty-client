angular.module('thriftyApp')
  .component('register', {
    templateUrl: 'register.template.html',
    controller: function ($http, $scope) {
      $scope.sendData = function() {
        var data ={
          email: $scope.user.email,
          password: $scope.user.password
        }

        $http({
          method: 'POST',
          url: 'https://thrifty-api.herokuapp.com/register',
          data: data
        })
        .success(function (data) {
          console.log(data)
          $scope.message = data.message
        })
        .error(function (data) {
          console.log(data)
          $scope.message = data.error
        })
      }
    }
  })
