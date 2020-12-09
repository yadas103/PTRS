/**
 * @ngdoc directive
 * @name gcms.administration.directive:gcmsAdministrationBox
 * @restrict E
 * @description
 * This directive displays the profile name, profile countries, return button, and save button.
 *
 *``html
 <div class="panel panel-primary">

   <div class="panel-heading">
     <h3 class="panel-title">You are adding detail to:</h3>
   </div>

   <div class="panel-body">

     <div class="form-group">
       <label class="large-text">Name</label>
       <div class="small-text">{{user.firstName}} {{user.lastName}}</div>
     </div>

     <hr/>

     <div>
       <label class="large-text">Countries</label>
       <div class="small-text" ng-repeat="profile in user.userProfiles"><gcms-idname id="profile.countryId" list="country"></gcms-idname>
         <span ng-show="profile.defaultProfileIndicator === 'Y'">(primary)</span>
       </div>
     </div>

     <hr/>

     <div class="form-group" >
       <span class="btn btn-default ng-scope" role="button" ui-sref="admin-roles"><i class="fa fa-times-circle fa-2x"></i></span>
       <gcms-modal template="changeReason.html" controller="ModalDefaultCtrl" ok="save">
         <span  class="btn btn-default" role="button"><i class="fa fa-floppy-o fa-2x"></i></span>
       </gcms-modal>
     </div>

   </div>

 </div>
 *``
 **/

 (function () {

   'use strict';

   angular
     .module('gcms.administration')
     .directive('gcmsAdministrationBox', AdministrationBox);

     AdministrationBox.$inject = [];

     /**
      * @ngdoc method
      * @name AdministrationBox
      * @methodOf gcms.administration.directive:gcmsAdministrationBox
      * @description Constructor for the gcmsAdministrationBox directive
      * @returns {object} gcmsAdministrationBox directive
      */
     function AdministrationBox() {
       return {
         restrict: 'E',
         scope: {
           user: '=',
           doSave: '&save'
         },
         templateUrl: 'app/admin/components/box/administration.box.html',
         controller: function($scope) {
           /**
            * @ngdoc method
            * @name save
            * @methodOf gcms.administration.directive:gcmsAdministrationBox
            * @description Saves the user profile with a change reason
            * @param {object} item The change reason
            */
            $scope.save = function(item){
              $scope.doSave()(item);
            };

         }
       };
     }
})();
