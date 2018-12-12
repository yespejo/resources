var app = angular.module("app", []);
app.controller("bbRsaController", function($scope, $http) {
	var publickey = "b7c6fd81d2ff8a8ea0cc73216238b5a8c8e53de2f73719e85651e916888a5dd4bb0c8fab4c30c2ca898e6dc44acfba4b9c0c011f3457e958b8f8478976657bce4a0a35793a0e6d2f176416ca726fbb1e93a2b8d0ad0a140902dffb00a4bdc7fba9deec121d9455d0f1f21ce9d4ad5eecce17a7c01b6a64ea366fb881c9eead5";
	$scope.sendMessage = function(successFunction, errorFunction) {
		var Auth0 = cifrar(publickey, "ben");
		var Auth1 = cifrar(publickey, "benspassword");
		console.log(Auth0);
		console.log(Auth1);
		$http({
			url: "http://example.appspot.com/rest/app",
			method: "POST",
			headers: {
				'Authorization': Auth0 + ":" + Auth1 
			}
		}).then(function successCallback(response) {
			successFunction(response.data);
		}, function errorCallback(response) {
			errorFunction(response.statusText);
		});
	}
});
