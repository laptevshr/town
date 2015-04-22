var townApp = angular.module('townApp', ['ngRoute', 'ui.bootstrap', 'toaster']);

townApp.config(function ($routeProvider) {
    $routeProvider
        .when('/admAdress', {
            templateUrl: 'views/admAdress.htm',
            controller: 'admAdressCtrl'
        })
        .when('/admOrg', {
            templateUrl: 'views/admOrg.htm',
            controller: 'admOrgCtrl'
        })
        .when('/admAddOrg', {
            templateUrl: 'views/adminAddAddress.htm',
            controller: 'admAddOrg'
        });
});