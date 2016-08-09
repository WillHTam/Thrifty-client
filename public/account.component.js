angular.module('thriftyApp')
  .component('account', {
    templateUrl: 'account.template.html',
    controller: function ($http, $scope, $location) {
      $scope.accountChange = function() {
        var data= {
          first_name: $scope.account.first_name,
          last_name: $scope.account.last_name,
          email: $scope.account.email,
          password: $scope.account.password,
          monthly_income: $scope.account.monthly_income
        }

        $http({
          method: 'PUT',
          url: 'https://thrifty-app.herokuapp.com/account',
          data: data,
          headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
        })
        .success( function (data) {
          console.log(data)
          window.localStorage.email = data.email
          window.localStorage.auth_token = data.auth_token
          $location.path('/account')
        })
      }

      $scope.checkHeaders = function () {
        console.log(window.localStorage.email)
        console.log(window.localStorage.auth_token)
      }

      $scope.deleteUser = function () {
        $http({
          method: 'DELETE',
          url: 'https://thrifty-app.herokuapp.com/deleteUser',
          headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
        })
        .success( function (data) {
          console.log('fuck you')
          $location.path('https://app-stg.msf.gov.sg/Assistance')
        })
      }
    }
  })
