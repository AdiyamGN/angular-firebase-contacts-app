
	'use strict';

	angular
		.module('contacts.register', ['ngRoute', 'firebase'])
		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/register', {
				templateUrl: 'register/register.html',
				controller: 'registerCtrl'
			});
		}])

		.controller('registerCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location) {

			$scope.signUp = function() {
				var username = $scope.user.email;
				var password = $scope.user.password;

				if(username && password) {
					var auth = $firebaseAuth();
					auth.$createUserWithEmailAndPassword(username, password).then(function() {
						console.log('User Created successfully');
						$location.path('/login')
					}).catch(function(error) {
						$scope.errMsg = true;
						$scope.errorMessage = error.message;
					});
				}

			}
			
		}])



