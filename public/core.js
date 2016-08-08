var app = angular.module('thriftyApp', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<welcome></welcome>'
    })
    .when('/register', {
      template: '<register></register>'
    })
    .when('/getstarted', {
      template: '<start></start>'
    })
    .when('/login', {
      template: '<login></login>'
    })
    .when('/home', {
      template: '<dashboard></dashboard>'
    })
    .when('/newgoal', {
      template: '<newgoal></newgoal>'
    })
    .when('/goalplan', {
      template: '<goalplan></goalplan>'
    })
    .when('/editgoalplan', {
      template: '<editplan></editplan>'
    })
    .when('/editgoal', {
      template: '<editgoal></editgoalplan>'
    })
    .when('/deletegoal', {
      template: '<deletegoal></deletegoal>'
    })
    .when('/account', {
      template: '<account></account>'
    })
})
