angular.module('thriftyApp')
  .component('dashboard', {
    templateUrl: 'dashboard.template.html',
    controller: function ($http, $scope) {
      $http.get("https://thrifty-app.herokuapp.com/me")
        .then(function (response) {
          $scope.first_name = response.first_name
        })
    }
  })
