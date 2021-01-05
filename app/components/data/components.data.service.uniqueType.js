/**
 * Service to Create missing profiles
 */
(function() {
  'use strict';

  angular
    .module('gcms.components.data')
    .factory('UniqueType', UniqueType);

  UniqueType.$inject = ['$resource','localeMapper','ENVIRONMENT'];

  function UniqueType($resource,localeMapper,ENVIRONMENT) {

    return $resource(
      ENVIRONMENT.SERVICE_URI + ':locale/uniqueType/:id' + ENVIRONMENT.SERVICE_EXT,
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
