/**
 * @ngdoc overview
 * @name gcms.profile.ProfileListCtrl
 *
 * @requires gcms.profile
 *
 * @description Controller: Handles Home, Creates Missing Profile , Generate Consent Annex modules.
 * 
 * @param ProfileSearch,$scope,$http,$stateParams,$state,myService,Templates,Country,IdentityRequest,Review,EmailGeneration,UserProfile,LoggedUserDetail,ConsentAnnex,ctrl,ConsentAnnexPdf
 */

(function () {

	'use strict';

	angular
	.module('gcms.profile')
	.filter('SearchFilter', function($filter){
		    return function(input, predicate){
		    	var fn=[];		    			    			    			    	   		    		    			    	 		    
		    	var keys = Object.keys(predicate);
		    	var y=0;
		    	var patternStr = '';		    			    	
		    	
		    	var patternlastName = (typeof predicate.lastName == "string") ? predicate.lastName.replace("%",".*") : predicate.lastName;
		    	var patternfirstName = (typeof predicate.firstName == "string") ? predicate.firstName.replace("%",".*") : predicate.firstName;
		    	var patternorganisationName = (typeof predicate.organisationName == "string") ? predicate.organisationName.replace("%",".*") : predicate.organisationName;
		    	var patterncity = (typeof predicate.city == "string") ? predicate.city.replace("%",".*") : predicate.city;
		    	var patternaddress = (typeof predicate.address == "string") ? predicate.address.replace("%",".*") : predicate.address;
		    	var patternspeciality = (typeof predicate.speciality == "string") ? predicate.speciality.replace("%",".*") : predicate.speciality;
		    	var patternidentifier =  (typeof predicate.identifier == "string") ? predicate.identifier.replace("%",".*") : predicate.identifier;
		    	var patternpoCode =  (typeof predicate.poCode == "string") ? predicate.poCode.replace("%",".*") : predicate.poCode;
		    	
		    	var lastName = new RegExp(patternlastName, 'gi');
		    	var organisationName = new RegExp(patternorganisationName, 'gi');
				//var organisationType = new RegExp(patternorganisationType, 'gi');
				var firstName = new RegExp(patternfirstName, 'gi');
				var city = new RegExp(patterncity, 'gi');
				var address = new RegExp(patternaddress, 'gi');
				var speciality = new RegExp(patternspeciality, 'gi');
				var identifier = new RegExp(patternidentifier, 'gi');
				var poCode = new RegExp(patternpoCode, 'gi');			
		    	
		    	if(keys.length != 0){
		    		
		    		if(input[0].type=='configuration/entityTypes/HCP'){    			
						for(var i in input){								
								if (lastName.exec(input[i].attributes.LastName[0].value) != null && firstName.exec(input[i].attributes.FirstName[0].value) != null &&
										input[i].attributes.Address !== undefined && (
										(input[i].attributes.Address !== '' && input[i].attributes.Address[0].value.City !== undefined && input[i].attributes.Address[0].value.City !== '' && city.exec(input[i].attributes.Address[0].value.City[0].value) != null) &&
										(input[i].attributes.Address !== '' && input[i].attributes.Address[0].value.AddressLine1 !== undefined && input[i].attributes.Address[0].value.AddressLine1 !== '' && address.exec(input[i].attributes.Address[0].value.AddressLine1[0].value) != null) &&
										(input[i].attributes.Address !== '' && input[i].attributes.Address[0].value.Zip !== undefined && input[i].attributes.Address[0].value.Zip !== '' && poCode.exec(input[i].attributes.Address[0].value.Zip[0].value.Zip5[0].value) != null)) &&
										(input[i].uri !== null && input[i].uri !== undefined && input[i].uri !== '' && identifier.exec(input[i].uri) != null) &&
										(input[i].attributes.Specialities !== null && input[i].attributes.Specialities !== undefined && input[i].attributes.Specialities !== '' && input[i].attributes.Specialities[0].value.Specialty !== null && input[i].attributes.Specialities[0].value.Specialty !== undefined && input[i].attributes.Specialities[0].value.Specialty !== '' && speciality.exec(input[i].attributes.Specialities[0].value.Specialty[0].value) != null)){
									lastName.lastIndex = 0;
									firstName.lastIndex = 0;
									city.lastIndex = 0;
									address.lastIndex = 0;
									speciality.lastIndex = 0;
									identifier.lastIndex = 0;
									poCode.lastIndex = 0;
									fn.push(input[i]);																	
								}
						}
						
						return fn;
		    		}
		    		
		    		if(input[0].type=='configuration/entityTypes/HCO'){			
						for(var i in input){							
							if (organisationName.exec(input[i].attributes.Name[0].value) != undefined && organisationName.exec(input[i].attributes.Name[0].value) != '' && organisationName.exec(input[i].attributes.Name[0].value) != null && city.exec(input[i].attributes.Address[0].value.City[0].value) != null 
									&& poCode.exec(input[i].attributes.Address[0].value.Zip[0].value.Zip5[0].value) != null
									&& address.exec(input[i].attributes.Address[0].value.AddressLine1[0].value) != null 
									&& identifier.exec(input[i].attributes.Identifiers[0].value.ID[0].value) != null){
								organisationName.lastIndex = 0;
								//organisationType.lastIndex = 0;
								city.lastIndex = 0;
								poCode.lastIndex = 0;
								address.lastIndex = 0;
								identifier.lastIndex = 0;
								fn.push(input[i]);																	
							}
						} 
						
						return fn;
		    		}
		    	}
		    		
		    	else{
		    		return input;
		    	}
		    }
		})
	.controller('ProfileListCtrl', ProfileSearch);

	ProfileSearch.$inject = ['ProfileSearch','$scope','UIConfig','$rootScope','Specialty','Credential','State','OrganizationType','UniqueType','Territory'];

	function ProfileSearch(ProfileSearch,$scope,UIConfig,$rootScope,Specialty,Credential,State,OrganizationType,UniqueType,Territory) {

		var params = {};
		console.log("Inside Profile.list.controller");	
		$scope.profile_val ={item:'PERSON'};

		
		$scope.uniqueProfile = [{
			name: 'RPPS',
			value: 'WFR.REX.I8,WPF.REX.I8'
		},   {
			name: 'ONEKEY',
			value: 'WFR.REX.I0'
		},	{
			name: 'GCP',
			value: 'GCP ID'
		},	{
			name: 'RELTIOID',
			value: 'RELTIOID'
		},	{
			name: 'GRV',
			value: 'GRV ID'
		},	{
			name: 'ADELI',
			value: 'WFR.REX.I1'
		},	{
			name: 'ORDRE',
			value: 'WFR.REX.I2,WPF.REX.I2'
		}];
		
		$scope.uniqueOrg = [{
			name: 'ONEKEY',
			value: 'WFR.REX.E0'
		},	{
			name: 'RELTIOID',
			value: 'RELTIOID'
		}, 	{
			name: 'SIRET',
			value: 'WFR.REX.E1'
		},	{
			name: 'FINESS',
			value: 'WFR.REX.EF,WFR.REX.E4'
		},	{
			name: 'SIREN',
			value: 'SIREN'
		},	{
			name: 'CIP',
			value: 'WFR.REX.E3,WFR.REX.E2'
		}];
		       	

		       	
		UIConfig.query().$promise.then(function(result){
		        	$scope.configFile = result;
		});	

		        
		//Getting Logged in User Profile
				
		        $scope.userProfileData = function(){		        	
					var currentprofile = $rootScope.currentProfile;
					
					$scope.loggedInUserCountry = currentprofile.countryId;
					$scope.loggedInUserCountryName = currentprofile.countryName ;
					$scope.loggedInUserCountryCode = currentprofile.isoCode ;
					$scope.loggedInUserRole = currentprofile.roleId;
					$scope.logged_In_User= currentprofile.userName;
					$scope.fullName = currentprofile.firstName+" "+currentprofile.lastName;										               
		};
		
		//Calling $scope.userProfileData() to get Logged in User Profile Data
		$scope.userProfileData();
		
		//Function to search for requested profiles			
		
		$scope.itemDetails = {};
		$scope.submit = function(itemDetails) {
			
			console.log("Inside Profile Search Tab");
			$scope.responseOnSearch = '';
			params =  itemDetails;
			var data = {"country":"","profileType":"","lastName":"","city":"","firstName":"","middleName":"",
					"speciality":"","organizationName":"","organizationType":"","credential":"","state":"","poCode":"","uniqueType":"","identificationNumber":"","territory":"",
					"max":"","offset":""};
			
			data.country = $rootScope.currentProfile.countryISOCode;
			data.profileType = $scope.profile_val.item;
			data.lastName = (params.lastName !== undefined && params.lastName !== "" ) ? params.lastName : 'lastName';
			data.middleName = (params.middleName !== undefined && params.middleName !== "" ) ? params.middleName : 'middleName';
			data.city = (params.city !== undefined && params.city !== "") ? params.city : 'city';
			data.firstName = (params.firstName !== undefined && params.firstName !== "") ? params.firstName : 'firstName';
			data.speciality = (params.speciality !== undefined && params.speciality !== "") ? params.speciality : 'speciality';
			data.credential = (params.credential !== undefined && params.credential !== "") ? params.credential : 'credential';
			data.organizationName = (params.organizationName !== undefined && params.organizationName !== "" ) ? params.organizationName : 'organizationName';
			data.organizationType = (params.organizationType !== undefined && params.organizationType !== "" ) ? params.organizationType : 'organizationType';
			data.state = (params.state !== undefined && params.state !== "") ? params.state : 'state';
			data.poCode = (params.poCode !== undefined && params.poCode !== "") ? params.poCode : 'poCode';
			data.uniqueType = (params.uniqueType !== undefined && params.uniqueType !== "") ? params.uniqueType : 'uniqueType';
			data.territory = (params.territory !== undefined && params.territory !== "") ? params.territory : 'territory';
			data.max = $scope.max;
			data.offset = $scope.offset;
			data.identificationNumber = (params.identificationNumber !== undefined && params.identificationNumber !== "") ? params.identificationNumber : 'identificationNumber';
			
			ProfileSearch.get({
				country : data.country,
				profileType : data.profileType,
				lastName : data.lastName,
				middleName : data.middleName,
				city : data.city,
				credential : data.credential,
				organizationName : data.organizationName,
				organizationType : data.organizationType,
				state : data.state,
				firstName : data.firstName,
				uniqueType : data.uniqueType,
				speciality : data.speciality,
				poCode : data.poCode,
				identificationNumber : data.identificationNumber,
				max : data.max,
				offset : data.offset,
				territory : data.territory
			}).$promise
			.then(function(profileSearch) {
				$scope.profileSearch= JSON.parse(profileSearch.string);	
				
				for(var i in $scope.profileSearch){
					$scope.profileSearch[i].uri = $scope.profileSearch[i].uri.substring(9, $scope.profileSearch[i].uri.length);
					if($scope.profileSearch[i].attributes.Address != undefined){
						for(var j in $scope.profileSearch[i].attributes.Address){
							if($scope.profileSearch[i].attributes.Address[j].value.AddressRank != undefined){
								if($scope.profileSearch[i].attributes.Address[j].value.AddressRank[0].value == '1'){
									$scope.profileSearch[i].attributes.Address[0] = $scope.profileSearch[i].attributes.Address[j];
								}
							}
						}
					}
					if($scope.profileSearch[0].type=='configuration/entityTypes/HCP'){
						if($scope.profileSearch[i].attributes.Specialities != undefined){
							for(var j in $scope.profileSearch[i].attributes.Specialities){
								if($scope.profileSearch[i].attributes.Specialities[j].value.Rank != undefined){
									if($scope.profileSearch[i].attributes.Specialities[j].value.Rank[0].value == '1'){
										$scope.profileSearch[i].attributes.Specialities[0] = $scope.profileSearch[i].attributes.Specialities[j];
									}
								}
							}
						}
					}
					
				}
				
				if($scope.profileSearch.length == 0){
					$scope.responseOnSearch = "No records to show (If you are searching for Territory specific profile other than France, Please use Territory filter dropdown)";
					$scope.buttondisableNext = "true";
				}
				else{
					$scope.buttondisableNext = "false";
				}
				$scope.isReset = true;
			}).catch(function(){
				$scope.responseOnSearch = "No records to show (If you are searching for Territory specific profile other than France, Please use Territory filter dropdown)"; 
				$scope.profileSearch.length = 0;
				$scope.profileSearchCopy.length = 0; 
			});                       
		};

		$scope.profileSearchCopy = [].concat($scope.profileSearch);
		
		//Loads all speciality 
		var updateSpecialty = function(result){
			$scope.specialty = result; 
			$rootScope.specialty = result;

		};
		
        var loadSpecialty = function(){		  
  		  $scope.specialty = [];
  		  Specialty.query({id : $scope.loggedInUserCountry}).$promise.then(updateSpecialty);
  			
  		};

  	  loadSpecialty();
  	
  	  $scope.$on('$localeChangeSuccess', loadSpecialty);
  	  
  	//Loads all credential 
  		var updateCredential = function(result){
  			$scope.credential = result;             

  		};

  		
  	  var loadCredential = function(){		  
  		  $scope.credential = [];
  		  Credential.query({id : $scope.loggedInUserCountry,partyType : $scope.profile_val.item}).$promise.then(updateCredential);
  			
  		};
  		
  		$scope.getCred = function(){
  			$scope.max = 20;
  			$scope.offset = 0;
  			$scope.buttondisable = "true";
  			$scope.buttondisableNext = "true";
  			$scope.profileSearchCopy = [];
  			$scope.itemDetails = {};
  			$scope.responseOnSearch = "";
  			$scope.credential = [];
  			  Credential.query({id : $scope.loggedInUserCountry,partyType : $scope.profile_val.item}).$promise.then(updateCredential);
  		};

  	  loadCredential();
  	
  	  $scope.$on('$localeChangeSuccess', loadCredential);
  		
  		//Loads all Organization Type
  		var updateOrgType = function(result){
  			$scope.orgType = result;             

  		};

  		
  	  var loadOrgType = function(){		  
  		  $scope.orgType = [];
  		  OrganizationType.query({id : $scope.loggedInUserCountry}).$promise.then(updateOrgType);
  			
  		};

  		loadOrgType();
  		$scope.$on('$localeChangeSuccess', loadOrgType);
  		
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
  		
  		//Loads all unique type 
  		var updateUniqueType = function(result){
  			$scope.uniqueType = result;             

  		};

  		
  	  var loadUniqueType = function(){		  
  		  $scope.uniqueType = [];
  		  UniqueType.query({id : $scope.loggedInUserCountry}).$promise.then(updateUniqueType);
  			
  		};

  		loadUniqueType();
  	
  	  $scope.$on('$localeChangeSuccess', loadUniqueType);
  	  
  	//Loads all State dropdown
		var updateState = function(result){
			$scope.state = result;             

		};

		
	  var loadState = function(){		  
		  $scope.state = [];
		  State.query({id : $scope.loggedInUserCountry}).$promise.then(updateState);
			
		};

		loadState();
		$scope.$on('$localeChangeSuccess', loadState);
		
		$scope.max = 20;
		$scope.offset = 0;
		
		$scope.setNextPage = function(item){
			$scope.offset = Number($scope.max) + Number($scope.offset);
			$scope.buttondisable = "false";
			
			$scope.submit(item);
		};
		
		$scope.buttondisable = "true";
		$scope.buttondisableNext = "true";
		$scope.setPreviousPage = function(item){
			if($scope.offset > $scope.max){
				$scope.offset = Number($scope.offset) - Number($scope.max);
			}
			else{
				$scope.offset = 0;
				$scope.buttondisable = "true";
			}
			
			$scope.submit(item);
		};
		
		$scope.cancel = function()
		{
			$scope.itemDetails = {};
		};
		
		$scope.setPagination = function(item)
		{
			$scope.submit(item);
		};
     
	}
	
})();
