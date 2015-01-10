'use strict';

adsApp.controller('AdminCategoriesController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;

    $scope.pageTitle = 'Administration - Categories';

    $scope.getAllCategories = function(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                $scope.categories = data['categories'];
                $scope.bigTotalItems = data['numItems'];
            })
            .error(function(data){
                error('Error get All users by admin');
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

    $scope.setPage = function(pageNo){
        $scope.bigCurrentPage = pageNo;

        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories?StartPage=' + $scope.bigCurrentPage,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {

            }
        };

        $http(request)
            .success(function(data) {
                $scope.categories = data['categories'];
                $scope.bigTotalItems = data['numItems'];

            })
            .error(function() {
                error('Cannot get ads');
            });
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/#');
    };
}]);