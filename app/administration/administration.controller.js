/**
 * @ngdoc overview
 * @name gcms.admin
 * @author: selim
 * @description Represents a admin controller.
 */
(function () {
  'use strict';


  angular
    .module('gcms.administration')
    .controller('AdminCtrl', AdminController);

  AdminController.$inject = ['$rootScope','$scope','$state','IdentityRequestView'];

  
  function AdminController($rootScope, $scope,$state,IdentityRequestView){
	  
	  console.log("Inside Admin controller");
	  $scope.excelSheetDLUAll = {} ;
      $scope.identityRequestView=[];
	  
      var loadIdentityRequestView = function(){	
    	  var data = {"id":"","status":""};
          data.status='Successful';
         	
          data.id = 'id';
    	  IdentityRequestView.query(data).$promise
          .then(function(result){
        	  
        	  $scope.identityRequestView = result.currentPageData;
        	  
        	  $scope.status='True';                  		
   			  $scope.recordlength=$scope.identityRequestView.length;
   			  
   			  }).catch(function(){
    				//$scope.responseOnSearch = "No records to show"
    					$scope.status='True';
    					$scope.records="No records to show";
    					//$scope.profileSearchCopy.length = 0;                               	
    				});
          };

       loadIdentityRequestView();
       $scope.displayedCollection = [].concat($scope.identityRequestView);
       
       $scope.loadDataDLUAll = function() { 
    	   IdentityRequestView.query().$promise
           .then(function(result) {
		        	$scope.data = result.currentPageData;
		        	for(var i  in $scope.data){
						if($scope.data[i].profileTypeId == 'HCO'){
							$scope.data[i].profileTypeId = 'ORGANIZATION';
						}
						if($scope.data[i].createdDate != null){
						$scope.data[i].createdDate = moment($scope.data[i].createdDate).format('DD/MM/YYYY');
						}						
	
							$scope.excelSheetDLUAll[i] = {  
							'Party Type':($scope.data[i].profileTypeId == null || $scope.data[i].profileTypeId == undefined ) ? '' : $scope.data[i].profileTypeId,
							'Organization':($scope.data[i].organizationName == null || $scope.data[i].organizationName == undefined ) ? '' : $scope.data[i].organizationName,
							'Party Last Name':($scope.data[i].lastName == null || $scope.data[i].lastName == undefined ) ? '' : $scope.data[i].lastName,
							'Party First Name':($scope.data[i].firstName == null || $scope.data[i].firstName == undefined ) ? '' : $scope.data[i].firstName, 
							'Identifier':($scope.data[i].uniqueIdentifier == null || $scope.data[i].uniqueIdentifier == undefined ) ? '' : $scope.data[i].uniqueIdentifier,
							'City':($scope.data[i].city == null || $scope.data[i].city == undefined ) ? '' : $scope.data[i].city,
							'Speciality':($scope.data[i].speciality == null || $scope.data[i].speciality == undefined ) ? '' : $scope.data[i].speciality,
						    'Status':($scope.data[i].reltioMsg == null || $scope.data[i].reltioMsg == undefined ) ? '' : $scope.data[i].reltioMsg,
							'Submitted By':($scope.data[i].createdBy == null || $scope.data[i].createdBy == undefined ) ? '' : $scope.data[i].createdBy,
							'Submitted On':($scope.data[i].createdDate == null || $scope.data[i].createdDate == undefined ) ? '' : $scope.data[i].createdDate						
							} ;	
																				
					}
					var data1 = $scope.excelSheetDLUAll;
		            var opts = [{sheetid:'Data',header:true}];
		            var res = alasql('SELECT INTO XLSX("Data.xlsx",?) FROM ?',[opts,[data1]]);
           });
       };
       
     //sending parameters for status
       var params={};
       $scope.request={};
       $scope.request.downchk='Successful';
       
       $scope.onCategoryChange= function(request){
    	
        $scope.records='';
       	params=request.downchk;
       	var data = {"id":"","status":""};
       	data.status=params;
       	
       	data.id = (params.id!== undefined && params.id!== "" ) ? params.id: 'id';
       	IdentityRequestView.query(data).$promise
             .then(function(result){
            	 $scope.identityRequestView = result.currentPageData; 
            	 $scope.displayedCollection = [].concat($scope.identityRequestView);
                    	}).catch(function(){
         				//$scope.responseOnSearch = "No records to show"
         					$scope.status='True';
         					$scope.records="No records to show";
         					//$scope.profileSearchCopy.length = 0;                               	
         				}); ;
         };

  }
})();
