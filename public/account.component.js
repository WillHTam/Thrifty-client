angular.module('thriftyApp')
  .component('account', {
    templateUrl: 'account.template.html',
    controller: function ($http, $scope, $location, $mdDialog) {
      $http({
        method: 'GET',
        url: 'https://thrifty-app.herokuapp.com/user/',
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function (response) {
        $scope.account.first_name = response.first_name
        $scope.account.last_name = response.last_name
        $scope.account.email=response.email
        $scope.account.monthly_income=response.monthly_income
      })

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
          $location.path('/dashboard')
        })
      }

      $scope.checkHeaders = function () {
        console.log(window.localStorage.email)
        console.log(window.localStorage.auth_token)
      }

      $scope.deleteUser = function () {
        $http({
          method:'DELETE',
          url: 'https://thrifty-app.herokuapp.com/deleteuser',
          headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
        })
        .success( function (data) {
          console.log('User deleted.')
        })
      }

      $scope.status = '  ';

      $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete your account?')
        .textContent('This action cannot be reversed.')
        .ariaLabel('Are you sure?')
        .targetEvent(ev)
        .ok("Confirm")
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          $scope.deleteUser();
          $location.path('/');
        }, function() {
          // $scope.status = 'Your goal is safe.';
        });
      };
    }
  })
