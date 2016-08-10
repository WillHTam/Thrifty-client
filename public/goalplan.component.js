angular.module('thriftyApp')
  .component('goalplan', {
    templateUrl: 'goalplan.template.html',
    controller: function ($http, $scope) {
      $http({
        method: 'GET',
        url: 'https://thrifty-app.herokuapp.com/user',
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function(response) {
        console.log(response)
        $scope.monthly_income = response.monthly_income
      })
    }
  })
