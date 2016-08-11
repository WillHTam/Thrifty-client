angular.module('thriftyApp')
  .component('getstarted', {
    templateUrl: 'getstarted.template.html',
    controller: function($http, $scope, $location) {
      $scope.sendData = function() {

        var data = {
          monthly_income: $scope.user.monthly_income,
          available_income: $scope.user.monthly_income
        }

        $scope.input = $scope.user.monthly_income;

        $scope.$watch('input', function () {
          if ($scope.input < 99) {
            console.log($scope.input)
            console.log("Not enough moneys!")
           }
          else if ($scope.input > 99) {
           console.log($scope.input)
           $http({
             method: 'PUT',
             url: 'https://thrifty-app.herokuapp.com/account',
             data: data,
             headers: {'email': window.localStorage.email, 'auth_token': window.localStorage.auth_token}
           })
           .success( function (data) {
             console.log("User updated! Proceed to next page.")
             $location.path("/newgoal")
           })
         }
       });

      } // end sendData function
    }
  })
