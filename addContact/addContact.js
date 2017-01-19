'use strict';

angular
	.module('contacts.addContact', ['ngRoute', 'firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/addContact', {
			templateUrl: 'addContact/addContact.html',
			controller: 'addContactCtrl'
		});
	}])

	.controller('addContactCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $location, $firebaseArray, CommonProp) {

		$scope.username = CommonProp.getUser();

		if(!$scope.username) {
			$location.path('/landing')
		}

		var ref = firebase.database().ref().child('Contacts');
		$scope.contacts = $firebaseArray(ref);

		$scope.createPost = function() {
			var name = $scope.contact.name;
			var email = $scope.contact.email;
			var sex = $scope.contact.sex;
			var phonenumber = $scope.contact.phonenumber;
			var birthdate = $scope.contact.birthdate;
			var address = $scope.contact.address;
			var city = $scope.contact.city;
			var country = $scope.contact.country;

			$scope.contacts.$add({
				name: name,
				email: email,
				sex: sex,
				phonenumber: phonenumber,
				birthdate: birthdate,
				address: address,
				city: city,
				country: country
			}).then(function(ref) {
				$location.path('/home');
			}, function(error) {
				console.log(error);
			});

		};

	}]);