angular.module('thriftyApp')
  .component('login', {
    templateUrl: 'login.template.html',
    controller: function ($http, $scope, $location) {
      $scope.loggerIn = function() {
        var data = {
          email: $scope.loguser.email,
          password: $scope.loguser.password
        }

        $http({
          method: 'POST',
          url: 'https://thrifty-app.herokuapp.com/login',
          data: data
        })
        .success( function (data) {
          console.log(data)
          // TODO: next two lines may not work
          window.localStorage.email = data.email
          window.localStorage.auth_token = data.auth_token
          $location.path('/')
        })
      }
    }
  })
