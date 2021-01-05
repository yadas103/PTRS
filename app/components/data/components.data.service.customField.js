/**
 * Service to Create missing profiles
 */
(function() {
  'use strict';

  angular
    .module('gcms.components.data')
    .factory('CustomField', CustomField);

  CustomField.$inject = ['$resource','localeMapper','ENVIRONMENT'];

  function CustomField($resource,localeMapper,ENVIRONMENT) {

    return $resource(
      ENVIRONMENT.SERVICE_URI + ':locale/custom-field/:id' + ENVIRONMENT.SERVICE_EXT,
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
