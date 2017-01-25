angular.module('starter.services', ['ngResource', 'starter.controllers'])

.factory('Account', function($resource) {
	return $resource('http://localhost:5000/accounts/:accountId');
});