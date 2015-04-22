townApp.factory('dbFactory', function ($http, $q, $filter) {
    var db = null;

    return {

        // take types of organizations
        getTypesOrg: function () {
            var def = $q.defer();

            $http.get('/api/TypeModel')
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    def.reject('Error in http request');
                    console.log(data);
                    console.log(status);
                });

            return def.promise;
        },


        delTypeOrg: function (id) {
            var def = $q.defer();

            $http.get('/api/deleteTypeModel/' + id)
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    def.reject('Error in http request');
                    console.log(data);
                    console.log(status);
                });

            return def.promise;
        },


        updTypeOrg: function (id, jdata) {
            var def = $q.defer();

            $http({
                    method: 'POST',
                    url: '/api/updateTypeModel/' + id,
                    data: jdata,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (response) {
                    console.log(response);
                    def.resolve(response);
                })
                .error(function (response) {
                    console.log(response);
                });

            return def.promise;
        },


        addTypeOrg: function (jdata) {
            var def = $q.defer();

            $http({
                    method: 'POST',
                    url: '/api/addTypeOrg',
                    data: jdata,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (response) {
                    console.log(response);
                    def.resolve(response);
                })
                .error(function (response) {
                    console.log(response);
                });

            return def.promise;
        },









        // take list of organizations
        getOrgs: function () {
            var def = $q.defer();

            $http.get('/api/orgs')
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    def.reject('Error in http request');
                    console.log(data);
                    console.log(status);
                });

            return def.promise;
        },





        addOrg: function (jdata) {
            var def = $q.defer();

            $http({
                    method: 'POST',
                    url: '/api/addOrg',
                    data: jdata,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (response) {
                    console.log(response);
                    def.resolve(response);
                })
                .error(function (response) {
                    console.log(response);
                });

            return def.promise;
        },









        getStreets: function () {
            var def = $q.defer();

            $http.get('/api/streets')
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    def.reject('Error in http request');
                    console.log(data);
                    console.log(status);
                });

            return def.promise;
        },





        getAddresses: function () {
            var def = $q.defer();

            $http.get('/api/addresses')
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    def.reject('Error in http request');
                    console.log(data);
                    console.log(status);
                });

            return def.promise;
        },




        addAddress: function (jdata) {

            var def = $q.defer();

            $http({
                    method: 'POST',
                    url: '/api/addAddress',
                    data: jdata,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (response) {
                    console.log(response);
                    def.resolve(response);
                })
                .error(function (response) {
                    console.log(response);
                });

            return def.promise;
        }
    }
});