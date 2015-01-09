'use strict';

var adsApp =  angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/home.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'views/user/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/user/register.html',
                controller: 'RegistrationController'
            })
            .when('/user/ads/publish', {
                templateUrl: 'views/user/publish-new-ad.html',
                controller: 'PublishNewAdController'
            })
            .when('/user/ads', {
                templateUrl: 'views/user/my-ads.html',
                controller: 'MyAdsController'
            })
            .when('/user/ads/delete', {
                templateUrl: 'views/user/delete-my-ad.html',
                controller: 'DeleteMyAdController'
            })
            .when('/user/ads/edit', {
                templateUrl: 'views/user/edit-my-ad.html',
                controller: 'EditMyAdController'
            })
            .when('/user/profile', {
                templateUrl: 'views/user/edit-user-profile.html',
                controller: 'EditUserProfileController'
            })
            .when('/admin/home', {
                templateUrl: 'views/admin/AdminHome.html',
                controller: 'AdminHomeController'
            })
            .when('/admin/ads/edit', {
                templateUrl: 'views/admin/AdminEditAd.html',
                controller: 'AdminEditAdController'
            })
            .when('/admin/ads/delete', {
                templateUrl: 'views/admin/AdminDeleteAd.html',
                controller: 'AdminDeleteAdController'
            })
            .when('/admin/users/list', {
                templateUrl: 'views/admin/AdminUsers.html',
                controller: 'AdminUsersController'
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
};

function error (text) {
    noty({
        text: text,
        type: 'error',
        layout: 'center',
        timeout: 1500
    });
};