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

  IdentityController.$inject = ['$scope','$rootScope','$http','IdentityRequest','toasty','Specialty','Credential','State','OrganizationType','BenefSpec','BenefSubType','CustomField','CustomDetails'];

  function IdentityController($scope,$rootScope,$http,IdentityRequest,toasty,Specialty,Credential,State,OrganizationType,BenefSpec,BenefSubType,CustomField,CustomDetails){
	  
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
      	        msg: 'Profile has been created in PTRS !',
      	        showClose: true,
      	        clickToClose: true,
      	        timeout: 5000,
      	        sound: false,
      	        html: false,
      	        shake: false,
      	        theme: 'bootstrap'
      	     });
		   };
	  $scope.submit = function(item){
		  item.profileTypeId = $scope.profile_val.item;
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
					item.suffix = '';
					item.title = '';
					item.credential='';
					item.organizationName = '';
					item.organizationType = '';
					item.city = '';
					item.country = '';
					item.speciality = '';
					item.addr1 = '';
					item.addr2 = '';
					item.addr3 = '';
					item.region = '';
					item.poCode = '';
					success();
				}

			}).catch(function(){
				
				internalError();


			}); 
	  };
	  
	  $scope.cancel = function()
		{
			$scope.item = {};
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
			$scope.credential = [];
			$scope.customDetails = [];
			Credential.query({id : $scope.loggedInUserCountry,partyType : $scope.profile_val.item}).$promise.then(updateCredential);
		};

	  loadCredential();
	
	  $scope.$on('$localeChangeSuccess', loadCredential);
		
	//Loading Countries
		var updateCountry = function(result){
			$scope.counties = result;         
		};

		var loadCountry = function(){
			$scope.counties = [];
			$scope.counties = $rootScope.countries;
			/*Country.query().$promise.then(updateCountry);*/
		};

		loadCountry();
		
		$scope.$on('$localeChangeSuccess', loadCountry);
		
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
			for(var i in $scope.specialty){
				if( $scope.specialty[i].spclCode == item.speciality && $scope.specialty[i].countryId == $scope.loggedInUserCountry){
					$scope.specId = $scope.specialty[i].id;
				}
			}
			//BenefSpec.query({id : $scope.specId}).$promise.then(updateBenefSpec);
			CustomDetails.query({id : $scope.specId}).$promise.then(updateCustomDetails);
		};
		
		$scope.compareSubType = function(item){	
			for(var i in $scope.orgType){
				if( $scope.orgType[i].subDesc == item.organizationType && $scope.orgType[i].countryId == $scope.loggedInUserCountry){
					$scope.subTypeId = $scope.orgType[i].id;
				}
			}
			//BenefSubType.query({id : $scope.subTypeId}).$promise.then(updateBenefSubType);
			CustomDetails.query({id : $scope.subTypeId}).$promise.then(updateCustomDetails);
		};
		
  }
 
})();