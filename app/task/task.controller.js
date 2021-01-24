/**
 * @ngdoc overview
 * @name gcms.task
 * 
 * @description Represents a task controller.
 */
(function () {
  'use strict';


  angular
    .module('gcms.task')
    .controller('TaskCtrl', TaskController);

  TaskController.$inject = ['$rootScope','$scope','$filter','$http','toasty'];

  
  function TaskController($rootScope, $scope,$filter,$http,toasty){
	  
	  console.log("Inside Task Page");
	  $scope.loggedInUserCountryCode = $rootScope.currentProfile.countryISOCode;
	  
	  var internalError = function(){
	        toasty.error({
	          title: 'Error',
	          msg: 'Internal Server Error!',
	          showClose: true,
	          clickToClose: true,
	          timeout: 5000,
	          sound: false,
	          html: false,
	          shake: false,
	          theme: 'bootstrap'
	        });
	      };
      var success = function(){
          toasty.success({
              title: 'Success',
              msg: 'Please fill the profile info and upload!',
              showClose: true,
              clickToClose: true,
              timeout: 10000,
              sound: false,
              html: false,
              shake: false,
              theme: 'bootstrap'
            });
          };
	//Downloads template in XSLSX
		$scope.downloadAsExcel = function(){
			console.log("Inside downloadAsExcel");
			$http.get('./config.json').then(function (response) {
				var link = response.data["test-server"].ENVIRONMENT.SERVICE_URI+'consent-annex-pdf/'+ $scope.loggedInUserCountryCode;
				$http({method: 'GET',url: link,responseType: 'arraybuffer'}).then(function (response) {
					var bin = new Blob([response.data]);
					var docName = 'Profile_Creation.xlsx';           
					saveAs(bin, docName); 
					success();
				}).catch(function(){
					internalError();
				});	
				
			});			
		};
    
  };
})();
