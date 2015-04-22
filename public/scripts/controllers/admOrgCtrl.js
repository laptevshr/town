townApp.controller('admOrgCtrl', function ($q, $http, $scope, dbFactory, toaster, $modal) {

    $scope.exec = function (func) {
        console.info(func);
        switch (func) {
        case 'shDialogTypes':
            shDialogTypes('type');
            break;
        case 'shDialogOrgs':
            shDialogTypes('org');
            break;
        }
    }


    // Show dialog window of TYPES
    function shDialogTypes(dlgName) {
        var templ = null;
        var contr = null;

        switch (dlgName) {
        case 'type':
            templ = '/views/dlgAddType.htm';
            contr = 'dlgTypeCtrl';
            break;
        case 'org':
            templ = '/views/dlgOrgs.htm';
            contr = 'dlgOrgsCtrl';
            break;
        }

        var modalInstance = $modal.open({
            templateUrl: templ,
            controller: contr,
            size: 'lg',
            resolve: {
                items: function () {
                    //return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };




});