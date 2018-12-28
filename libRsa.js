var app = angular.module("app", []);
var scopeApp;
var httpApp;
app.controller("bbRsaController", function($scope, $http) {
	console.log("load");
	scopeApp = $scope;
	httpApp = $http;
});

var send = {
	sendMessage : function(successFunction, errorFunction) {
		httpApp({
			url: "http://ldapauthenticationbdb-bdb-aut-des.s-cloudapps.bancodebogota.net/key",
			method: "GET",
			transformResponse: function (data, headersGetter, status) {
				return data;
			}
		}).then(function successCallback(response) {
			var Auth0 = cifrar(response.data, document.getElementById("login").value);
			var Auth1 = cifrar(response.data, document.getElementById("password").value);

			httpApp({
				url: "http://ldapauthenticationbdb-bdb-aut-des.s-cloudapps.bancodebogota.net/login",
				method: "GET",
				withCredentials: true,
				headers: {'Authorization': Auth0 + ":" + Auth1},
				transformResponse: function (data, headersGetter, status) {
					return data;
				}			
			}).then(function successCallback(response) {
				localStorage.setItem("Authorization", response.headers('Authorization'));
				console.log(localStorage.getItem("Authorization"));
				successFunction(response);
			}, function errorCallback(response) {
				errorFunction(response);
			});
		}, function errorCallback(response) {
		});		
	}
}
