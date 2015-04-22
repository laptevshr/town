// The page by administration streets or builds >>
townApp.controller('admAdressCtrl',
    function ($q, $http, $scope, dbFactory, toaster, $dialogs) {

        $scope.typeAddress = 'Build'; // Default check button

        /*function read addresses from collection*/
        $scope.getStreets = function () {
            dbFactory.getStreets().then(function (data) {
                $scope.streets = data;
                console.log(data);
            })
        }
        $scope.getStreets();


        /*function read addresses from collection*/
        $scope.getAddresses = function () {
            dbFactory.getAddresses().then(function (data) {
                $scope.address = data;
                console.log(data);
            })
        }
        $scope.getAddresses();





        /*function adding record to the collection of addresses*/
        $scope.addAddress = function () {
            var indexAddress = $scope.indexAddress;
            var nameAddress = $scope.nameAddress;


            var parentAddress = null;
            if ($scope.typeAddress == 'Build') {
                parentAddress = $scope.street._id;
            }

            var descrAddress = $scope.descrAddress;


            // tyAddress complete >>
            var typeAddress = [];
            typeAddress.push($scope.typeAddress);

            // add tags for build
            angular.forEach($scope.build, function (value, key) {
                this.push(key);
            }, typeAddress);
            // tyAddress complete <<



            var formData = {
                'indexAddress': indexAddress,
                'nameAddress': nameAddress,
                'parentAddress': parentAddress,
                'typeAddress': typeAddress,
                'descrAddress': descrAddress
            };


            var jdata = 'mydata=' + JSON.stringify(formData);


            // query is successfull 
            dbFactory.addAddress(jdata).then(function (_save) {
                toaster.pop('success', "Town", "Success saved " + $scope.typeAddress + " to database");
                $scope.indexAddress = "";
                $scope.nameAddress = "";
                $scope.parentAddress = "";
                $scope.descrAddress = "";
                $scope.build = false;
                $scope.latlangAddress = "";
                $scope.polygonAddress = "";
                $scope.typeAddress = "Build";
            });
        }

    }
);
// The page by administration streets or builds <<