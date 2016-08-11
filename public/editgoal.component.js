angular.module('thriftyApp')
.component('editgoal', {
  templateUrl: 'editgoal.template.html',
  controller: function ($scope, $http, $routeParams, $location, $mdDialog) {

    if (window.localStorage.auth_token == undefined) {
      $location.path('/')
    }

    // icons
    $scope.icons = ["pied-piper", "graduation-cap", "home", "paw", "plane", "car", "bank", "gift", "shopping-bag"]

    // GET user data
    $http({
      method: 'GET',
      url: 'https://thrifty-app.herokuapp.com/user',
      headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
    })
    .success( function(response) {
      console.log(response)
      $scope.available_income = response.available_income
    })

    // GET goal data
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
      $scope.goal.amount_saved = response[0].amount_saved
      $scope.goal.monthly_budget = response[0].monthly_budget

      $scope.index = $scope.icons.indexOf($scope.goal.icon)
    })

    // MODAL confirm deletion
    $scope.status = '  ';

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this goal?')
      .textContent('This action cannot be reversed.')
      .ariaLabel('Are you sure?')
      .targetEvent(ev)
      .ok("Confirm")
      .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        $scope.deleteGoal();
      }, function() {
        $scope.status = 'Your goal is safe.';
      });
    };


    // DELETE goal
    $scope.deleteGoal = function () {

      $scope.triggerDelete = false

      var latest_available_income = ($scope.available_income + $scope.goal.monthly_budget)

      var userData = {
        available_income: latest_available_income
      }

      // UPDATE USER available_income with freed up budget
      console.log("Available income will be updated to $" + latest_available_income)
      console.log(userData)

      $http({
        method: 'PUT',
        url: 'https://thrifty-app.herokuapp.com/account',
        data: userData,
        headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
      })
      .success( function (data) {
        console.log("USER HAS MORE MONEYS " + data)
        $scope.triggerDelete = true
      })

      if ($scope.triggerDelete = true) {
        $http({
          method: 'DELETE',
          url: 'https://thrifty-app.herokuapp.com/goal/' + $routeParams.id
        })
        .success( function(response) {
          console.log(response + "GOAL DELETED")
          $location.path('/dashboard')
        })
      }

    } // end deleteGoal()

    // ICON PICKER
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

    // EDIT goal and send to server
    $scope.editGoal = function () {
      var data = {
        name: $scope.goal.name,
        icon: $scope.icons[$scope.index],
        cost: $scope.goal.cost,
        time_left: $scope.goal.time_left,
        amount_saved: $scope.goal.amount_saved,
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
    } // end editGoal()
  }
})
