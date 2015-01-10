'use strict';

adsApp.controller('AdminCategoriesController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }


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
            })
            .error(function(data){
                error('Error get All users by admin');
                console.log(data);
            }
        );
    };

    $scope.getAllCategories();

    $scope.editCategory = function(id){
        $rootScope.editCategoryId = id;
        $location.path('/admin/categories/edit');
    };

    $scope.deleteCategory = function(id){
        $rootScope.deleteCategoryId = id;
        $location.path('/admin/categories/delete');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/#');
    };
}]);