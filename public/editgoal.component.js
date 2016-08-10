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
        console.log(response.name)
        $scope.dname = response[0].name
        $scope.dcost = response[0].cost
        $scope.dtime_left = response[0].time_left
        $scope.damount_left = response[0].amount_left
        $scope.dmonthly_budget = response[0].monthly_budget
      })

      $scope.editGoal = function () {
        var data = {
          name: $scope.editgo.name,
          cost: $scope.editgo.cost,
          time_left: $scope.editgo.time_left,
          amount_left: $scope.editgo.amount_left,
          monthly_budget: $scope.editgo.monthly_budget
        }

        $http({
          method: 'POST',
          url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id,
          data: data,
          headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
        })
        .success( function (data) {
           console.log('success')
           console.log('data')
           $location.path('/dashboard')
        })
      }
    }
  })
