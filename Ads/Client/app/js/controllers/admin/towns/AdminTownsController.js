'use strict';

adsApp.controller('AdminTownsController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }


    $scope.pageTitle = 'Administration - Towns';

    $scope.getAllTowns = function(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/towns',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                $scope.towns = data['towns'];
            })
            .error(function(data){
                error('Error get All towns by admin');
                console.log(data);
            }
        );
    };

    $scope.getAllCategories();

    $scope.editCategory = function(category){
        $rootScope.editCategory = category;
        $location.path('/admin/categories/edit');
    };

    $scope.deleteCategory = function(category){
        $rootScope.deleteCategory = category;
        $location.path('/admin/categories/delete');
    };

    $scope.createCategory = function(){
        $location.path('/admin/categories/create');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/#');
    };
}]);