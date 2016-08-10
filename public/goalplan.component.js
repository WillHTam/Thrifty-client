angular.module('thriftyApp')
.component('goalplan', {
  templateUrl: 'goalplan.template.html',
  controller: function ($http, $scope) {
    $scope.monthly_budget = 100
    $scope.time_left = 1
    $scope.unit =  function () {
      if ($scope.time_left === 1) {
        return "month"
      }
      else if ($scope.time_left > 1) {
        return "months"
      }
    }
    $scope.max_time = function () {
      var max_time = $scope.cost / $scope.monthly_budget
      return max_time
    }

    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/user',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      console.log(response)
      $scope.monthly_income = response.monthly_income
    })

    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/mygoals',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      window.localStorage.goal_id = response[response.length - 1]._id
      $scope.cost = response[response.length - 1].cost
    })
  }
})
