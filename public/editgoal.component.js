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
        $scope.goal.name = response[0].name
        $scope.goal.icon = response[0].icon
        $scope.goal.cost = response[0].cost
        $scope.goal.time_left = response[0].time_left
        $scope.goal.amount_left = response[0].amount_left
        $scope.goal.monthly_budget = response[0].monthly_budget
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

      // icons
      $scope.icons = ["graduation-cap", "home", "plane", "car", "bank", "gift", "shopping-bag"]

      $scope.index = 0
      $scope.prev = function() {
        if ($scope.index === 0) {
          $scope.index = $scope.icons.length - 1;
        }
        else {
          $scope.index -= 1;
        }
        console.log($scope.icons[$scope.index])
      }
      $scope.next = function() {
        $scope.index += 1;
        if ($scope.index === $scope.icons.length) {
          $scope.index = 0;
        }
        console.log($scope.icons[$scope.index])
      }

      $scope.editGoal = function () {
        var data = {
          name: $scope.goal.name,
          icon: $scope.icons[$scope.index],
          cost: $scope.goal.cost,
          time_left: $scope.goal.time_left,
          amount_left: $scope.goal.amount_left,
          monthly_budget: $scope.goal.monthly_budget
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
