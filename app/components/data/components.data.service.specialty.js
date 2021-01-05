/**
 * Service to Create missing profiles
 */
(function() {
  'use strict';

  angular
    .module('gcms.components.data')
    .factory('Specialty', Specialty);

  Specialty.$inject = ['$resource','localeMapper','ENVIRONMENT'];

  function Specialty($resource,localeMapper,ENVIRONMENT) {

    return $resource(
      ENVIRONMENT.SERVICE_URI + ':locale/specialty/:id' + ENVIRONMENT.SERVICE_EXT,
      {
    	  id: '@id',
          locale: function(){ return localeMapper.getCurrentISOCode(); }   	     	  
      },
      {        
    	  query:  { method:'GET', isArray:true }
      }
    );

  }

})();
