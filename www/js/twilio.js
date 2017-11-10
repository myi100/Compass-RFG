/*
 * Part of mcwebb/angular-twilio
 * Coypyright 2015 Matthew Webb <matthewowebb@gmail.com>
 * MIT License
 */
angular.module('mcwebb.twilio', [])

.config(function (TwilioProvider) {
	TwilioProvider.setCredentials({
		accountSid: 'ACc2d6b3f8f812ae4370be74ad1796412e',
		authToken: 'f567a93031efc10db7154526bf87409e'
	});
})

.provider('Twilio', function () {
	var apiEndpoint, credentials, accounts;

	credentials = {
		accountSid: '',
		authToken: ''
	};

	accounts = {
		_default: ''
	};

	this.setCredentials = function (o) {
		credentials.accountSid = o.accountSid;
		accounts._default = o.accountSid;
		credentials.authToken = o.authToken;
	};

	this.setAccounts = function (o) {
		for (var key in o) {
			if (key === '_default')
				throw 'cannot add "_default" account, it\'s used internally';
			else accounts[key] = o[key];
		}
	};

	this.$get = function ($window, $http) {
		var credentialsB64,
			internal = {};

		credentialsB64 = $window.btoa(
			credentials.accountSid + ':' + credentials.authToken
		);

		internal.transformResourceUrl = function (url) {
			if (url.substr(-1) === '/')
				url = url.substr(0, url.length - 1);
			return url;
		};

		internal.transformRequest = function (data, getHeaders) {
			// If this is not an object, defer to native stringification.
			if (!angular.isObject(data)) {
				return (data === null) ? '' : data.toString();
			}

			var buffer = [];
			// Serialize each key in the object.
			for (var name in data) {
				if (!data.hasOwnProperty(name)) continue;
				var value = data[name];
				buffer.push(
					encodeURIComponent(name) +
					'=' +
					encodeURIComponent((value === null) ? '' : value )
				);
			}

			// Serialize the buffer and clean it up for transportation.
			var source = buffer
				.join('&')
				.replace(/%20/g, '+')
			;

			return source;
		};

		internal.accountsRequest = function (method, resource, data, account) {
			method = method.toUpperCase();

			if (!angular.isString(account) || account.length < 1)
				account = '_default';
			resource = 'Accounts/' +
				accounts[account] + '/' +
				internal.transformResourceUrl(resource + '.json')
			;
			
			apiEndpoint = 'https://api.twilio.com/2010-04-01/';

			var request = {
				method: method,
				url: apiEndpoint + resource,
				headers: {
					'Authorization': 'Basic ' + credentialsB64
				}
			};
			
			if (method === 'POST' || method === 'PUT') {
				if (data) request.data = data;
				request.transformRequest = internal.transformRequest;
				request.headers['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			} else if (data) {
				request.params = data;
			}
			
			return $http(request);
		};
		
		internal.lookupRequest = function (method, resource, account) {
			method = method.toUpperCase();

			if (!angular.isString(account) || account.length < 1)
				account = '_default';
			resource = internal.transformResourceUrl(resource)
			;
			
			apiEndpoint = 'https://lookups.twilio.com/v1/PhoneNumbers/';

			var request = {
				method: method,
				url: apiEndpoint + resource,
				headers: {
					'Authorization': 'Basic ' + credentialsB64
				}
			};
			
			
			
			return $http(request);
		};

		internal.lookup = function (resource, data, account) {
			return internal.lookupRequest('GET', resource, account);
		};
		
		internal.create = function (resource, data, account) {
			return internal.accountsRequest('POST', resource, data, account);
		};

		internal.read = function (resource, data, account) {
			return internal.accountsRequest('GET', resource, data, account);
		};

		internal.update = function (resource, data, account) {
			return internal.accountsRequest('PUT', resource, data, account);
		};

		internal.remove = function (resource, account) {
			return internal.accountsRequest('DELETE', resource, null, account);
		};

		return {
		    lookup: internal.lookup,
			create:	internal.create,
			read:	internal.read,
			update:	internal.update,
			remove:	internal.remove
		};
	};
});