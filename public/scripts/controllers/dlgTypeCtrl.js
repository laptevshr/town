 townApp.controller('dlgTypeCtrl', function ($scope, $modalInstance, dbFactory, toaster) {

     $scope.editEnabled = false;

     $scope.ok = function () {
         $modalInstance.close();
     };

     /*$scope.cancel = function () {
    $modalInstance.dismiss();
};*/



     $scope.editData = function (item) {
         item.editEnabled = true;
         console.log(item);
     };

     $scope.saveData = function (item) {
         item.editEnabled = false;
         console.log(item);

         var formData = {
             'nameType': item.name,
             'descrType': item.descr,
             'tagsType': item.tags
         };

         var jdata = 'data=' + JSON.stringify(formData);

         dbFactory.updTypeOrg(item._id, jdata).then(function (_save) {
             toaster.pop('success', "Directory", "Type Success updated");
         });
     };


     $scope.deleteData = function (item) {
         item.editEnabled = false;
         console.log(item);
         dbFactory.delTypeOrg(item._id).then(function () {
             toaster.pop('success', "Directory", "Type Success deleted");
             $scope.getTypesOrg();
         })

     };



     /*function read addresses from collection*/
     $scope.getTypesOrg = function () {
         dbFactory.getTypesOrg().then(function (data) {
             $scope.typeOrg = data;
         })
     }
     $scope.getTypesOrg();



     /*function adding record to the collection of addresses*/
     $scope.addTypeOrg = function () {

         var formData = {
             'nameType': $scope.nameType,
             'descrType': $scope.descrType,
             'tagsType': $scope.tagsType
         };


         var jdata = 'data=' + JSON.stringify(formData);


         // query is successfull 
         dbFactory.addTypeOrg(jdata).then(function (_save) {
             toaster.pop('success', "Directory", "Success saved " + $scope.nameType + " to database");
             $scope.nameType = "";
             $scope.descrType = "";
             $scope.tagsType = "";
             $scope.getTypesOrg();
         });
     }


 })