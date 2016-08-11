angular.module('thriftyApp')
  .component('editgoal', {
    templateUrl: 'editgoal.template.html',
    controller: function ($scope, $http, $routeParams, $location) {
      $http({
        method: 'GET',
        url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id,
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function(response) {
        console.log(response)
        $scope.editgo.name = response[0].name
        $scope.editgo.cost = response[0].cost
        $scope.editgo.time_left = response[0].time_left
        $scope.editgo.amount_saved = response[0].amount_saved
        $scope.editgo.monthly_budget = response[0].monthly_budget
      })

      $scope.deleteGoal = function () {
        $http({
          method: 'DELETE',
          url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id
        })
        .success( function(response) {
          console.log(response)
          $location.path('/dashboard')
        })
      }

      $scope.editGoal = function () {
        var data = {
          name: $scope.editgo.name,
          cost: $scope.editgo.cost,
          time_left: $scope.editgo.time_left,
          amount_saved: $scope.editgo.amount_saved,
          monthly_budget: $scope.editgo.monthly_budget
        }

        $http({
          method: 'PUT',
          url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id,
          data: data
        })
        .success( function (data) {
           console.log('success')
           console.log('data')
           $location.path('/dashboard')
        })
      }
    }
  })
