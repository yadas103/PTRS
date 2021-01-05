/**
 * Service to Create missing profiles
 */
(function() {
  'use strict';

  angular
    .module('gcms.components.data')
    .factory('BenefSubType', BenefSubType);

  BenefSubType.$inject = ['$resource','localeMapper','ENVIRONMENT'];

  function BenefSubType($resource,localeMapper,ENVIRONMENT) {

    return $resource(
      ENVIRONMENT.SERVICE_URI + ':locale/benefsubtype/:id' + ENVIRONMENT.SERVICE_EXT,
      {
    	  id: '@id',
          locale: function(){ return localeMapper.getCurrentISOCode(); }   	     	  
      },
      {        
    	  query:  { method:'GET'}
      }
    );

  }

})();
