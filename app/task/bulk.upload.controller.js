/**
 * @ngdoc overview
 * @name ptrs-reltio.bulkUpload
 *
 * @description
 * Represents a bulkUpload controller.
 */
(function () {
  'use strict';


  angular
    .module('gcms.task')
    .controller('BulkCtrl',BulkUploadController);

  BulkUploadController.$inject = ['$rootScope','$scope','FileUploader','FileMonitor','localeMapper','toasty' ];

  
  function BulkUploadController($rootScope, $scope,FileUploader,FileMonitor,localeMapper,toasty ){
	  
	  console.log("Inside Bulk Upload controller");      
      $scope.uploads = [];
      $scope.alerts = [];
      $scope.locale = localeMapper.getCurrentISOCode();
      $scope.userID= $rootScope.loggedInUserRoleId;
 
      
      $scope.uploader = new FileUploader({
        filters: [{
          fn: function(item) {
            var flag = false;
            for (var i in this.queue){
              if (item.name === this.queue[i].file.name){
                flag = true;
              }
            }

            if (flag){
              item.name += '(' + (this.queue.length + 1) + ')';
            }

            return true;
          }
        }],

        url: '../ptrs-reltio-service/' + $scope.locale + '/bulk-upload'
       
      });   
      $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
      $scope.upload = function() {
   	   console.log("Inside upload");
   	   $scope.a=false;
          //if ($scope.uploader.queue.length > 0) {
   	if($scope.uploader.progress==100){
   	   $scope.success='';
 	   $scope.error='';
       	   return FileMonitor.query({userid:$scope.userID}).$promise.then(function(result){
   		       $scope.Result = result;
   		       
   		       /**
				 *  Reltio Message and Reltio Code are overloaded with overall stat msg and error code
				 *  0 - No record to process [error]
				 *  1 - No error [success]
				 *  2 - Some record failed [warning]
				 *  3 - Bad/Malformed Template 
				 */
   		       $scope.processCode = result[0].reltioCode;
   		       $scope.message = result[0].reltioMsg;
   		       $scope.a=result.$resolved
   		       
   		       if($scope.processCode == 3) {
   		    	toasty.error({
					title: 'Error: ',
					msg: 'No valid records found! Please fill the template correctly and try again.',
					showClose: true,
					clickToClose: true,
					timeout: 20000,
					sound: false,
					html: false,
					shake: false,
					theme: 'bootstrap'
				});
   		       }
   		       
   		    if($scope.processCode == 0) {
   		    	toasty.error({
					title: 'Error: ',
					msg: $scope.message,
					showClose: true,
					clickToClose: true,
					timeout: 20000,
					sound: false,
					html: false,
					shake: false,
					theme: 'bootstrap'
				});
   		       }
   		       
   		       
   		    if($scope.processCode == 2) {
   		    	toasty.warning({
					title: 'Action Required: ',
					msg: ''+$scope.message+'. Please refer Report screen for more detail.',
					showClose: true,
					clickToClose: true,
					timeout: 20000,
					sound: false,
					html: false,
					shake: false,
					theme: 'bootstrap'
				});
   		    }
   		    
   		    if($scope.processCode == 1) {   
			   toasty.success({
					title: 'Success: ',
					msg: 'All records processed successfully: '+$scope.message+'. Please check report for Reltio status',
					showClose: true,
					clickToClose: true,
					timeout: 20000,
					sound: false,
					html: false,
					shake: false,
					theme: 'bootstrap'
				});
   		    }
   		    	$scope.callServer($scope.tableState);
   		      // $scope.alerts.push({type:'success', msg: $scope.uploader.queue.length + 'File(s) Processing Successful'});
   		       $scope.uploader.clearQueue();       
   		      }).catch(function(){
     		    	$scope.uploader.clearQueue(); 
     		    	console.log("error occured in file upload")
       		    	//$scope.error="File(s) not able to process ";
       		});
   		  };
            
          }
	  
    
  }
})();
