'use strict';

/**
* @ngdoc overview
* @name yourAppNameApp
* @description
* # yourAppNameApp
*
* Main module of the application.
*/
var app = angular
    .module('yourAppNameApp', [
        'ngAnimate',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
    ]);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/partials/splash.html',
        controller: 'MainCtrl'
    })
    .when('/main', {
        templateUrl: 'views/partials/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
