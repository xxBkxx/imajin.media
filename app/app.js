(function(){

angular
	.module("imajinApp", ['ui.router', 'ngRoute', 'ngMessages']);

angular
	.module("imajinApp")
	.config(function($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider){

		$routeProvider
			.when('/home',{
				templateUrl: "site/partials/form.html",
				controller:  "FormController as ctrl"
			})
			.otherwise({
				redirectTo: "/home"
			});

			// for url beautification
			$locationProvider.html5Mode(true);

		// $urlRouterProvider.otherwise('/')
		// $stateProvider
		// 	.state('form', {

		// 		url:"/form",

		// 		views:{

		// 			'form':{

		// 				templateUrl:  '/site/partials/form.html'
		// 			},
		// 			controller:   "FormController as ctrl"
		// 			// controllerAs: "ctrl",

		// 	}
		// 	});

			$httpProvider.interceptors.push(function(loadSrv, $q, $rootScope){

				return {

					request: function(config){

						if (localStorage.authToken != undefined){
							config.headers.authentication = localStorage.authToken;
						}
						console.log('requesting');
						// console.log(config);
						return config;
					},

					responseError: function(rejection){
						if (rejection.status === 401){
							console.log(rejection);
							
							$rootScope.$broadcast('httpResponseRejection', rejection);
							return $q.reject(rejection);
						}

					},

					response: function(response){

						var deferred  = $q.defer();
						var promise   = deferred.promise;
						var status    = response.status;
						// var authToken = response.headers('authentication');

						if (status === 200){
							$('.loader').css("visibility", 'hidden');
							$rootScope.$broadcast('httpResponse', response);
							console.log(response);
							return $q.resolve(response);

						}
		


						// This was for a listener on login.ctrl
						// if(response.status === 200){
						// 	$rootScope.$broadcast('success', response);
						// }

						// if (authToken){

						// 	var decryptToken = jwtHelper.decodeToken(authToken);
							
						// 	if (decryptToken.email){

						// 		window.localStorage.setItem("authToken", JSON.stringify(authToken));
						// 	}
						// }
						// console.log( authToken);
						return response;
					}

				}
			})
	})
})();