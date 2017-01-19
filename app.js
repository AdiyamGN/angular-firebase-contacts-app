'use strict';

// Declare app level module which depends on views, and components
angular.module('contacts', [
  'ngRoute',
  'contacts.landing',
  'contacts.login',
  'contacts.register',
  'contacts.home',
  'contacts.addContact'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/landing'});
}]);
