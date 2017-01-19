'use strict';

angular
	.module('contacts.home', ['ngRoute', 'firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		});
	}])

	.controller('homeCtrl', ['$scope', '$firebaseArray','CommonProp', '$firebaseObject', '$location', function($scope, $firebaseArray, CommonProp, $firebaseObject, $location) {

		$scope.username = CommonProp.getUser();

		if(!$scope.username) {
			$location.path('/landing');
		}

		var ref = firebase.database().ref().child('Contacts');
		$scope.contacts = $firebaseArray(ref);
		$scope.selectedContact = null;
		$scope.displayLimit = 20;
		$scope.order = 'name';

		$scope.editContact = function(id) {
			var ref = firebase.database().ref().child('Contacts/' + id);
			$scope.editContactData = $firebaseObject(ref);
		};

		$scope.updateContact = function(id) {
			var ref = firebase.database().ref().child('Contacts/' + id);
			ref.update({
			  name: $scope.editContactData.name,
			  email: $scope.editContactData.email,
			  sex: $scope.editContactData.sex,
			  phonenumber: $scope.editContactData.phonenumber,
			  birthdate: $scope.editContactData.birthdate,
			  address: $scope.editContactData.address,
			  city: $scope.editContactData.city,
			  country: $scope.editContactData.country
			}).then(function(ref) {
				$('#editModal').modal('hide');
			}, function(error) {
				console.log(error);
			});
		};

		$scope.logout = function() {
			CommonProp.logoutUser();
		}

	}]);