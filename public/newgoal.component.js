angular.module('thriftyApp')
  .component('newgoal', {
    templateUrl: 'newgoal.template.html',
    controller: function ($http, $scope, $location) {
      $scope.sendData = function() {
        var data = {
          name: $scope.newgoal.name,
          cost: $scope.newgoal.cost
        }

        $http({
          method: 'POST',
          url: 'https:thrifty-app.herokuapp.com/newgoal',
          data: data
        })
        .success( function (data) {
          console.log(data)
          $location.path("/goalplan")
        })
      }
  }})
