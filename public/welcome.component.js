angular.module('thriftyApp')
  .component('welcome', {
    templateUrl: 'welcome.template.html',
    controller: function ($scope) {
      $scope.display = function () {
        console.log(window.localStorage.email)
        console.log(window.localStorage.auth_token)
      }
    }
  })
