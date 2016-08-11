angular.module('thriftyApp')
  .component('welcome', {
    templateUrl: 'welcome.template.html',
    controller: function ($scope) {
      $scope.CurrentDate = Date()
      $scope.display = function () {
        console.log(window.localStorage.email)
        console.log(window.localStorage.auth_token)
      }
      $scope.logOut = function () {
        console.log('Cleared!')
        window.localStorage.email = undefined
        window.localStorage.auth_token = undefined
      }
    }
  })
