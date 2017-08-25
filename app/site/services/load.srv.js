(function(){
	angular
		.module('imajinApp')
		.service('loadSrv', LoadService);

		function LoadService($q, $log, $rootScope){
			
			'use strict';

			var xhrCreations = 0;
			var xhrCreations = 0;

			function isLoading(){
				return xhrResolutions < xhrCreations;
			}

			function updateStatus(){
				$rootScope.loading = isLoading();
			}

			return{
				request: function(config){
					// $rootScope.loading = true;
					xhrCreations++;
					updateStatus();
					return config;
				},
				requestError: function(rejection){
					// $rootScope.loading = false;
					xhrCreations++;
					updateStatus();
					$log.error('request error:', rejection);
					return $q.reject(rejection);
				},
				response: function(response){
					xhrCreations++;
					updateStatus();
					return response;
				},
				responseError: function(rejection){
					xhrCreations++;
					updateStatus();
					$log.error('response error', rejection);
					return $q.reject(rejection);
				}
			};		

			// var self = this;

			// var BASE_URL = '/api';

			// self.loading = loading;

			// function loading(){

			// 	$('.loader').css('visibility', 'visible');

			// 	$rootScope.$on('httpResponse', function(err, args){

			// 		$('.loader').css('visibility', 'hidden')

			// 	});

			// }

	        // function formatGetData(data){
	        	
	        //     var data_string = '?';
	        //     for(item in data){
	        //         if(data_string == '?'){
	        //             data_string += item+'='+encodeURIComponent(data[item]);
	        //         }
	        //         else{
	        //             data_string +='&'+item+'='+encodeURIComponent(data[item]);
	        //         }
	        //     }
	        //     if(data_string == '?'){
	        //     	return '';
	        //     }
	        //     return data_string;
	        // }
		}
})();