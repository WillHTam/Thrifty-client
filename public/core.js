var app = angular.module('thriftyApp', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<welcome></welcome>'
    })
    .when('/register', {
      template: '<register></register>'
    })
})
