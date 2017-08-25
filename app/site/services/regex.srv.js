(function(){
	angular
		.module('imajinApp')
		.service('regexSrv', RegularexpressionConroller);

		function RegularexpressionConroller(){
			var self = this;

			this.emailRegEx   = emailRegEx;
			this.messageRegEx = messageRegEx;

			function emailRegEx(){
				var regEx = /0-9a-z_-./ig;
				return regEx;
			}

			function messageRegEx(){
				var regEx = /0-9a-z_-,.?!@#$%^&*()+='"\//ig;
				return regEx
			}
		}
})();