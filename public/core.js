var app = angular.module('thriftyApp', ['ngRoute', 'ngMaterial'])

app.config(function($mdThemingProvider) {
  // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  var mintyMap = $mdThemingProvider.extendPalette('teal', {
    '500': '#4CDB94',
    'contrastDefaultColor': 'light'
  });
  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('minty', mintyMap);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('minty', {
      'default': '500', // by default use shade 400 from the teal palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<welcome></welcome>'
    })
    .when('/register', {
      template: '<register></register>'
    })
    .when('/getstarted', {
      template: '<getstarted></getstarted>'
    })
    .when('/login', {
      template: '<login></login>'
    })
    .when('/dashboard', {
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
