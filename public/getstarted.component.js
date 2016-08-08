angular.module('thriftyApp')
  .component('getstarted', {
    templateUrl: 'getstarted.template.html',
    controller: function($http, $scope, $location) {
      $scope.sendData = function() {
        var data = {
          monthly_income: $scope.monthlyIncome.number
        }

        $http({
          method: 'PUT',
          url: 'https://thrifty-app.herokuapp.com/account',
          data: data,
          headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
        })
        .success( function (data) {
          console.log(data)
          $location.path("/main")
        })
      }
    }
  })
