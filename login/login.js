
	'use strict';

	angular
		.module('contacts.login', ['ngRoute', 'firebase'])
		
		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/login', {
				templateUrl: 'login/login.html',
				controller: 'loginCtrl'
			});
		}])
		
	.controller('loginCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp) {

		$scope.username = CommonProp.getUser();
		

		$scope.signIn = function() {
			var username = $scope.user.email;
			var password = $scope.user.password;
			var auth = firebase.auth();

			auth.signInWithEmailAndPassword(username, password).then(function() {
				CommonProp.setUser($scope.user.email);
				$location.path('/home');
			}).catch(function(error) {
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			});

		}

	

	}])

	.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth) {
		var user = '';
		var auth = firebase.auth();

		return {
			getUser: function(){
				if(user == "") {
					user = localStorage.getItem('userEmail');
				}
				return user;
			}, 
			setUser: function(value) {
				localStorage.setItem('userEmail', value);
				user = value;
			},
			logoutUser: function() {
				auth.signOut();
				console.log('Logged Out Successfully');
				user = '';
				localStorage.removeItem('userEmail');
				$location.path('/landing');

			}
		};

	}])


