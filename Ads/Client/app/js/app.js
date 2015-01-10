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
            .when('/admin/users/edit', {
                templateUrl: 'views/admin/AdminEditUser.html',
                controller: 'AdminEditUserController'
            })
            .when('/admin/users/delete', {
                templateUrl: 'views/admin/AdminDeleteUser.html',
                controller: 'AdminDeleteUserController'
            })
            .when('/admin/categories/list', {
                templateUrl: 'views/admin/categories/AdminCategories.html',
                controller: 'AdminCategoriesController'
            })
            .when('/admin/categories/delete', {
                templateUrl: 'views/admin/categories/AdminDeleteCategory.html',
                controller: 'AdminDeleteCategoryController'
            })
            .when('/admin/categories/edit', {
                templateUrl: 'views/admin/categories/AdminEditCategory.html',
                controller: 'AdminEditCategoryController'
            })
            .when('/admin/categories/create', {
                templateUrl: 'views/admin/categories/AdminCreateCategory.html',
                controller: 'AdminCreateCategoryController'
            })
            .when('/admin/towns/list', {
                templateUrl: 'views/admin/towns/AdminTowns.html',
                controller: 'AdminTownsController'
            })
            .when('/admin/towns/create', {
                templateUrl: 'views/admin/towns/AdminCreateTown.html',
                controller: 'AdminCreateTownController'
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