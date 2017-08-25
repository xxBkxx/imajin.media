(function(){

	angular
		.module('imajinApp')
		.controller('FormController', FormController);

	function FormController(apiSrv, $scope, loadSrv, regexSrv){
		
		formVm = this;
		formVm.sendEmail    = sendEmail;

		formVm.emailRegEx   = regexSrv.emailRegEx();
		formVm.messageRegEx = regexSrv.messageRegEx();

		function sendEmail(){

			//loadSrv.loading();

			$('.loader').css("visibility", 'visible');
			formData = new FormData ();

			formData.append('email_address', formVm.email);
			formData.append('message', formVm.message);

			apiSrv.request('/saveMsg', formData, "POST");

			formVm.email   ='';
			formVm.message ='';
			$scope.contactFrm.$setPristine();
			
		}
	}
})();
