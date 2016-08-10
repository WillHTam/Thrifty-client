angular.module('thriftyApp')
  .component('dashboard', {
    templateUrl: 'dashboard.template.html',
    controller: function ($http, $scope) {
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
    }
  })
