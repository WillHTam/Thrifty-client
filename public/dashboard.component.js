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

    // GET all of user's goals
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

    // ADD SAVINGS (assuming it happens once a month)
    $scope.addSavings = function (index) {

      // UPDATE user
      var latest_available_income = ($scope.available_income - $scope.goals[index].monthly_budget)

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
        window.localStorage.email = data.email
        window.localStorage.auth_token = data.auth_token
        $location.path('/dashboard')
      })

      // UPDATE goal
      var amount_saved = ($scope.goals[index].amount_saved + $scope.goals[index].monthly_budget)

      var time_left = ($scope.goals[index].time_left - 1)

      var goalData = {
        amount_saved: amount_saved,
        time_left: time_left
      }

      $http({
        method: 'PUT',
        url: 'https://thrifty-app.herokuapp.com/goal/' + $scope.goals[index]._id,
        data: goalData
      })
      .success( function (data) {
        console.log('Goal updated' + data)
        $location.path('/dashboard')
      })

    } // end addSavings()

  } // end controller
})
