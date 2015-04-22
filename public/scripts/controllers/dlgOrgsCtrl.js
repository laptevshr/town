 townApp.controller('dlgOrgsCtrl', function ($scope, $filter, $modalInstance, dbFactory, toaster) {

     $scope.photos = [];

     $scope.phones = [];





     $scope.ok = function () {
         $modalInstance.close();
     };

     /*$scope.cancel = function () {
    $modalInstance.dismiss();
};*/


     // add remove Category
     $scope.category = [];
     $scope.addCategory = function () {
         $scope.category.push($scope.selectCategory);
     }


     $scope.delCategory = function (ind) {
         $scope.category.splice(ind, 1);
     }



     // add remove mode time
     $scope.modeWork = [];
     $scope.modes = [{
         'day': 'пн',
         'dayn': 1
     }, {
         'day': 'вт',
         'dayn': 2
     }, {
         'day': 'ср',
         'dayn': 3
     }, {
         'day': 'чт',
         'dayn': 4
     }, {
         'day': 'пт',
         'dayn': 5
     }, {
         'day': 'сб',
         'dayn': 6
     }, {
         'day': 'вс',
         'dayn': 7
     }];



     $scope.standartBreak = {
         br: "12:00-13:00"
     };



     $scope.addBreak = function (_mode) {
         _mode.break.push(
             angular.copy($scope.standartBreak.br)
         );
     }


     $scope.addPhoto = function () {
         $scope.photos.push({
             fileName: ''
         });
     }

     $scope.delPhoto = function (ind) {
         $scope.photos.splice(ind, 1);
     }



     $scope.addMode = function () {
         var arrDayn = [];

         angular.forEach($filter('filter')($scope.modes, 'true'), function (value, key) {
             this.push(value.dayn);
         }, arrDayn);

         var startAdr = $scope.startHourAdr + ':' + $scope.startMinAdr;
         var endAdr = $scope.endHourAdr + ':' + $scope.endMinAdr;

         $scope.modeWork.push({
             dayOfWeek: arrDayn,
             wh: startAdr + '-' + endAdr,
             break: []
         });
     }



     $scope.addPhone = function () {

         $scope.phones.push({
             main: null,
             insNum: null,
             title: ''
         });
     };


     $scope.delPhone = function (ind) {
         $scope.phones.splice(ind, 1);
     }






     /*function read types*/
     $scope.getTypesOrg = function () {
         dbFactory.getTypesOrg().then(function (data) {
             $scope.typeOrg = data;
         })
     }
     $scope.getTypesOrg();



     /*function adding record to the collection of addresses*/
     $scope.addOrg = function () {

         var formData = {
             'orgName': $scope.orgName,
             'descr': $scope.descr,
             'category': $scope.category,
             'latlang': {
                 point: '0'
             },
             phone: $scope.phones,
             site: $scope.site,
             socialPage: $scope.socialPage,
             email: $scope.email,
             modeWork: $scope.modeWork,
             tags: $scope.tags,
             personalPage: $scope.personalPage,
             photo: $scope.photos
         };


         var jdata = 'data=' + JSON.stringify(formData);

         $scope.formData = formData;
         // query is successfull 
         dbFactory.addOrg(jdata).then(function (_save) {
             toaster.pop('success', "Organization", "Success saved " + $scope.orgName + " to database");

             $scope.orgName = "";
             $scope.descr = "";
             $scope.selectCategory = null;
             $scope.category = [];
             $scope.phones = [];
             $scope.site = "";
             $scope.socialPage = "";
             $scope.email = "";
             $scope.modeWork = null;
             $scope.tags = "";
             $scope.personalPage = "";
             $scope.photos = [];

             // $scope.getTypesOrg();
         });
     }


 })