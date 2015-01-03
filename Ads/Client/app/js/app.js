'use strict';

var adsApp =  angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegistrationController'
            })
            .otherwise({redirectTo: '/'});
    });

function success(message) {
    noty({
        text: message,
        type: 'success',
        layout: 'center',
        timeout: 1000
    });
}

function error (text) {
    noty({
        text: text,
        type: 'error',
        layout: 'center',
        timeout: 1000
    });
}