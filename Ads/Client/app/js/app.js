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
            .when('/user/ads/publish', {
                templateUrl: 'views/publish-new-ad.html',
                controller: 'PublishNewAdController'
            })
            .when('/user/ads', {
                templateUrl: 'views/my-ads.html',
                controller: 'MyAdsController'
            })
            .when('/user/ads/delete', {
                templateUrl: 'views/delete-my-ad.html',
                controller: 'DeleteMyAdController'
            })
            .when('/user/ads/edit', {
                templateUrl: 'views/edit-my-ad.html',
                controller: 'EditMyAdController'
            })
            .when('/user/profile', {
                templateUrl: 'views/edit-user-profile.html',
                controller: 'EditUserProfileController'
            })
            .otherwise({redirectTo: '/'});
    });

function success(message) {
    noty({
        text: message,
        type: 'success',
        layout: 'center',
        timeout: 1500
    });
}

function error (text) {
    noty({
        text: text,
        type: 'error',
        layout: 'center',
        timeout: 1500
    });
}