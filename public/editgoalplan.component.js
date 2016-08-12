angular.module('thriftyApp')
.component('editgoalplan', {
  templateUrl: 'editgoalplan.template.html',
  controller: function ($http, $scope, $location, $routeParams) {
    if (window.localStorage.auth_token == undefined) {
      $location.path('/')
    }

    // get current goal's ID and cost
    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id,
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      // latest goal
      console.log(response[0])
      window.localStorage.goal_id = response[0]._id
      $scope.cost = response[0].cost
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

    // max monthly budget
    $scope.max_budget = function () {
      if ($scope.cost < $scope.available_income) {
        return Math.round($scope.cost)
      }
      else if ($scope.cost > $scope.available_income) {
        return Math.round( $scope.cost / $scope.min_time() )
      }
    }

    // shortest possible time using highest budget (entire available_income)
    $scope.min_time = function() {
      var min_time = $scope.cost / $scope.available_income
      // if cost is more than available_income, round up months
      if (min_time > 1) {
        return Math.ceil(min_time)
      }
      // else you can pay for it after 1 month
      else {
        return 1
      }
    }

    // if user saves minimum of $100 / month
    $scope.max_time = function () {
      var max_time = $scope.cost / 100
      return max_time
    }

    $scope.monthly_budget_changed = function () {
      $scope.time_left = Math.ceil($scope.cost / $scope.monthly_budget)
    }

    $scope.time_left_changed = function () {
      $scope.monthly_budget = Math.ceil($scope.cost / $scope.time_left)
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
        }
      })
      .success( function (data) {
        console.log("Goal created! " + data)
        $location.path("/dashboard")
      })

      // UPDATE USER available_income
      var latest_available_income = ($scope.available_income - $scope.monthly_budget)

      var userData = {
        available_income: latest_available_income
      }

      console.log("Available income will be updated to $" + latest_available_income)
      console.log(userData)

      $http({
        method: 'PUT',
        url: 'https://thrifty-app.herokuapp.com/account',
        data: userData,
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function (data) {
        console.log("User updated. " + data)
      })

    } // end sendData()



  } // end controller
})
