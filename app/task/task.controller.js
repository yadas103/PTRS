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

  TaskController.$inject = ['$rootScope','$scope','$filter'];

  
  function TaskController($rootScope, $scope,$filter){
	  
	  console.log("Inside Task Page");
	  $scope.loggedInUserCountryCode = $rootScope.currentProfile.countryISOCode;
	  
	  
    
  };
})();
