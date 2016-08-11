angular.module('thriftyApp')
  .component('dashboard', {
    templateUrl: 'dashboard.template.html',
    controller: function ($http, $scope, $location) {
      $http({
        method: 'GET',
        url: 'https://thrifty-app.herokuapp.com/user',
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function(response) {
        console.log(response)
        $scope.first_name = response.first_name
        $scope.last_name = response.last_name
        $scope.available_income = response.available_income
      })

      $http({
        method: 'GET',
        url: 'https://thrifty-app.herokuapp.com/mygoals',
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function(response) {
        console.log(response)
        $scope.goals = response
      })

      $scope.goEdit = function () {
        console.log('button pressed')
        $location.path('/account')
      }

      $scope.newGoal = function () {
        console.log('button pressed')
        $location.path('/newgoal')
      }

      $scope.prevMonth = function () {
        console.log('Ein monate vor!')
        $location.path('/dashboard')
      }

      $scope.nextMonth = function () {
        console.log('Ein monate später!')
        $location.path('/dashboard')
      }

      $scope.logOut = function () {
        console.log('Cleared!')
        window.localStorage.email = undefined
        window.localStorage.auth_token = undefined
        $location.path('/')
      }
    }
  })
