angular.module('thriftyApp')
.component('goalplan', {
  templateUrl: 'goalplan.template.html',
  controller: function ($http, $scope) {

    // get current goal's ID and cost
    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/mygoals',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      console.log(response[response.length - 1])
      window.localStorage.goal_id = response[response.length - 1]._id
      $scope.cost = response[response.length - 1].cost
      $scope.time_left = $scope.cost / $scope.monthly_budget
    })

    // get user's available income
    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/user',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      console.log(response)
      $scope.available_income = response.available_income
    })

    $scope.monthly_budget = 100


    $scope.monthly_budget_changed = function () {
      $scope.time_left = Math.ceil($scope.cost / $scope.monthly_budget)
      console.log("monthly_budget_changed() ran")
    }

    $scope.time_left_changed = function () {
      $scope.monthly_budget = Math.ceil($scope.cost / $scope.time_left)
      console.log("time_left_changed() ran")
    }

    $scope.unit =  function () {
      if ($scope.time_left === 1) {
        return "month"
      }
      else if ($scope.time_left > 1) {
        return "months"
      }
    }

    // if user saves minimum of $100 / month
    $scope.max_time = function () {
      var max_time = $scope.cost / 100
      return max_time
    }
    $scope.min_time = function () {
      var min_time = $scope.cost / $scope.available_income
      return min_time
    }

    $scope.sendData = function() {
      var data = {
        time_left: $scope.time_left,
        monthly_budget: $scope.monthly_budget,
      }

      $http({
        method: 'POST',
        url: 'https://thrifty-app.herokuapp.com/newgoal',
        data: data,
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token},
        beforeSend: function (xhr) {
          xhr.setRequestHeader('email', window.localStorage.email)
          xhr.setRequestHeader('auth_token', window.localStorage.auth_token)
          // ADD CUTE WAITING UI HERE
        }
      })
      .success( function (data) {
        console.log("Goal created! " + data)
        $location.path("/dashboard")
      })
    }

  } // end controller
})
