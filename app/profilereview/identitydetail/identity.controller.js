/**
 * @ngdoc overview
 * @name gcms.IdentityRequest
 * 
 * @description Represents a IdentityRequestView controller.
 */  
(function () {
  'use strict';
  angular
    .module('gcms.identity')
    .controller('identityCtrl', IdentityController);

  IdentityController.$inject = ['$scope','$rootScope','$http','IdentityRequest','toasty','Specialty','Credential','State','OrganizationType','BenefSpec','BenefSubType','CustomField','CustomDetails','Territory'];

  function IdentityController($scope,$rootScope,$http,IdentityRequest,toasty,Specialty,Credential,State,OrganizationType,BenefSpec,BenefSubType,CustomField,CustomDetails,Territory){
	  
	  $scope.item = {};
	  $scope.clearText = "";
	  $scope.loggedInUserCountry = $rootScope.currentProfile.countryId;
	  $scope.loggedInUserCountryName = $rootScope.currentProfile.countryName ;
	  $scope.loggedInUserCountryCode = $rootScope.currentProfile.countryISOCode;
	  $scope.profile_val ={item:'PERSON'};
	  $scope.customDetails = [];
	
	  var internalError = function(){
	        toasty.error({
	          title: 'Error',
	          msg: 'Profile Creation failed. Profile may already exist or temporary issue in Reltio. For duplicate Profile verification check Report tab!',
	          showClose: true,
	          clickToClose: true,
	          timeout: 60000,
	          sound: false,
	          html: false,
	          shake: false,
	          theme: 'bootstrap'
	        });
	      };
	      
	  var success = function(){ 
		        toasty.success({
      	        title: 'Success',
      	        msg: 'Profile has been created in Reltio !',
      	        showClose: true,
      	        clickToClose: true,
      	        timeout: 60000,
      	        sound: false,
      	        html: false,
      	        shake: false,
      	        theme: 'bootstrap'
      	     });
		   };
	  $scope.submit = function(item){
		  
		  if(item.specialityDetail !== undefined){
			  for(var i in item.specialityDetail){
				  if(item.specialityDetail[i] == "-"){
					  $scope.profilelength = i;
				  }
			  }
			  
			  item.speciality = item.specialityDetail.substring(0, $scope.profilelength);
			  item.specialityCode = item.specialityDetail.substring(Number($scope.profilelength) + 1, item.specialityDetail.length);  
		  }	
		  
		  if(item.orgDetails != null || item.orgDetails != undefined){
			  for(var i in item.orgDetails){
				  if(item.orgDetails[i] == "-"){
					  $scope.profilelength = i;
				  }
			 }
			  item.organizationType = item.orgDetails.substring(0, $scope.profilelength); 
		  }
		  		  
		  item.profileTypeId = $scope.profile_val.item;
		  item.country = $scope.loggedInUserCountryName;
		  item.countryCode = $scope.loggedInUserCountryCode;
		  item.customDetails = $scope.customDetails;
		  console.log("Inside submit function");
			IdentityRequest.save(item).$promise
			.then(function(result) {
				if(result.$promise.$$state.status == 1)
				{
					item.firstName = '';
					item.profileTypeId = '';
					item.lastName = '';
					item.middleName = '';
					item.orgType = '';
					item.suffix = '';
					item.title = '';
					item.credential='';
					item.organizationName = '';
					item.orgDetails = '';
					item.organizationType = '';
					item.city = '';
					item.country = '';
					item.countryCode = '';
					item.specialityDetail = '';
					item.speciality = '';
					item.specialityCode = '';
					item.gender = '';
					item.state = '';
					item.addr1 = '';
					item.addr2 = '';
					item.addr3 = '';
					item.region = '';
					item.poCode = '';
					item.customDetails = '';
					$scope.customDetails = '';
					
					if(result.reltioMsg == 'Profile Created without Organization Type in Reltio ! Reason - This Organization Type is not available in Reltio.' 
						|| result.reltioMsg == 'Error Creating Profile !' 
							|| result.reltioMsg == 'Profile Created without Specialty in Reltio ! Reason - This Specialty is not available in Reltio.'){
						var message = result.reltioMsg;
						toasty.warning({
					          title: 'Error',
					          msg: message,
					          showClose: true,
					          clickToClose: true,
					          timeout: 5000,
					          sound: false,
					          html: false,
					          shake: false,
					          theme: 'bootstrap'
					        });
					}
					else{
						success();
					}
				}

			}).catch(function(){
				
				internalError();


			}); 
	  };
	  
	  $scope.cancel = function()
		{
			$scope.item = {};
			$scope.customDetails = [];
		};
		
		//Loads all speciality 
		var updateSpecialty = function(result){
			$scope.specialty = result;             
			$rootScope.specialty = $scope.specialty;

		};

		
	  var loadSpecialty = function(){		  
		  $scope.specialty = [];
		  Specialty.query({id : $scope.loggedInUserCountry}).$promise.then(updateSpecialty);
			
		};

	  loadSpecialty();
	
	  $scope.$on('$localeChangeSuccess', loadSpecialty);
	  
	//Loads all custom field 
		var updateCustomField = function(result){
			$scope.custom = result;             
			$rootScope.custom = $scope.custom;

		};

		
	  var loadCustomField = function(){		  
		  $scope.custom = [];
		  CustomField.query().$promise.then(updateCustomField);
			
		};

	  loadCustomField();
	
	  $scope.$on('$localeChangeSuccess', loadCustomField);
	  
	//Loads all credential 
	  var updateCredential = function(result){
			$scope.credential = result;   
			$rootScope.credential = $scope.credential;

		};

		
	  var loadCredential = function(){		  
		  $scope.credential = [];
		  Credential.query({id : $scope.loggedInUserCountry,partyType : $scope.profile_val.item}).$promise.then(updateCredential);
			
		};
		
		$scope.getCred = function(){
			$scope.item = {};
			$scope.credential = [];
			$scope.customDetails = [];
			Credential.query({id : $scope.loggedInUserCountry,partyType : $scope.profile_val.item}).$promise.then(updateCredential);
		};

	  loadCredential();
	
	  $scope.$on('$localeChangeSuccess', loadCredential);
		
		//Loads all State dropdown
		var updateState = function(result){
			$scope.state = result;             
			$rootScope.state = $scope.state;

		};

		
	  var loadState = function(){		  
		  $scope.state = [];
		  State.query({id : $scope.loggedInUserCountry}).$promise.then(updateState);
			
		};

		loadState();
		$scope.$on('$localeChangeSuccess', loadState);
		
		//Loads all Territory Type
  		var updateTerritory = function(result){
  			$scope.territory = result;             

  		};

  		
  	  var loadTerritory = function(){		  
  		  $scope.territory = [];
  		  Territory.query().$promise.then(updateTerritory);
  			
  		};

  		loadTerritory();
  		$scope.$on('$localeChangeSuccess', loadTerritory);
		
		//Loads all Organization Type
		var updateOrgType = function(result){
			$scope.orgType = result;             
			$rootScope.orgType = $scope.orgType;

		};

		
	  var loadOrgType = function(){		  
		  $scope.orgType = [];
		  OrganizationType.query({id : $scope.loggedInUserCountry}).$promise.then(updateOrgType);
			
		};

		loadOrgType();
		$scope.$on('$localeChangeSuccess', loadOrgType);
		
		var updateBenefSpec = function(result){
			$scope.benefSpec = result; 

		};	
		
		var updateBenefSubType = function(result){
			$scope.benefSubType = result; 
		};
		
		var updateCustomDetails = function(result){
			$scope.customDetails = result; 

		};
		
		$scope.compare = function(item){
			for(var i in item.specialityDetail){
				  if(item.specialityDetail[i] == "-"){
					  $scope.profilelength = i;
				  }
			  }
			  
			  item.speciality = item.specialityDetail.substring(0, $scope.profilelength);
			  item.specialityCode = item.specialityDetail.substring(Number($scope.profilelength) + 1, item.specialityDetail.length);
			  
			for(var i in $scope.specialty){
				if( $scope.specialty[i].spclCode == item.specialityCode && $scope.specialty[i].countryId == $scope.loggedInUserCountry){
					$scope.specId = $scope.specialty[i].id;
				}
			}
			//BenefSpec.query({id : $scope.specId}).$promise.then(updateBenefSpec);
			CustomDetails.query({id : $scope.specId,partyType : $scope.profile_val.item}).$promise.then(updateCustomDetails);
		};
		
		$scope.compareSubType = function(item){	
			
			if(item.orgDetails !== undefined){
				  for(var i in item.orgDetails){
					  if(item.orgDetails[i] == "-"){
						  $scope.profilelength = i;
					  }
				  }
			
				  item.organizationType = item.orgDetails.substring(0, $scope.profilelength);  
			  }
			
			for(var i in $scope.orgType){
				if( $scope.orgType[i].subDesc == item.organizationType && $scope.orgType[i].countryId == $scope.loggedInUserCountry){
					$scope.subTypeId = $scope.orgType[i].id;
				}
			}
			
			//BenefSubType.query({id : $scope.subTypeId}).$promise.then(updateBenefSubType);
			CustomDetails.query({id : $scope.subTypeId,partyType : $scope.profile_val.item}).$promise.then(updateCustomDetails);
		};
		
  }
 
})();