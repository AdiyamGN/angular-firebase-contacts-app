'use strict';

angular
	.module('contacts.landing', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/landing', {
			templateUrl: 'landing/landing.html',
			controller: 'landingCtrl'
		});
	}])



	.controller('landingCtrl', landingCtrl);

	function landingCtrl() {

	}

