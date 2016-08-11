angular.module('thriftyApp')
.component('goalplan', {
  templateUrl: 'goalplan.template.html',
  controller: function ($http, $scope, $location) {
    if (window.localStorage.auth_token == undefined) {
      $location.path('/')
    }

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

    //default lowest monthly budget
    $scope.monthly_budget = 100

    // default minimum 1 month
    $scope.min_time = function() {
      var min_time = $scope.cost / $scope.available_income
      if (min_time > 1) {
        return min_time
      }
      else {
        return 1
      }
    }

    $scope.monthly_budget_changed = function () {
      $scope.time_left = Math.ceil($scope.cost / $scope.monthly_budget)
    }

    $scope.time_left_changed = function () {
      $scope.monthly_budget = Math.ceil($scope.cost / $scope.time_left)
    }

    // max monthly budget
    $scope.max_budget = function () {
      if ($scope.cost < $scope.available_income) {
        return $scope.cost
      }
      else {
        return $scope.available_income
      }
    }

    // if user saves minimum of $100 / month
    $scope.max_time = function () {
      var max_time = $scope.cost / 100
      return max_time
    }

    // grammar fix
    $scope.unit =  function () {
      if ($scope.time_left === 1) {
        return "month"
      }
      else if ($scope.time_left > 1) {
        return "months"
      }
    }


    $scope.sendData = function() {
      var goalData = {
        time_left: $scope.time_left,
        monthly_budget: $scope.monthly_budget,
      }

      // UPDATE goal
      $http({
        method: 'PUT',
        url: 'https://thrifty-app.herokuapp.com/goal/' + window.localStorage.goal_id,
        data: goalData,
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
