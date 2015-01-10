'use strict';

adsApp.controller('AdminDeleteCategoryController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.deleteCategoryId = $rootScope.deleteCategory['id'];
    $scope.deleteCategoryName = $rootScope.deleteCategory['username'];

    $scope.pageTitle = 'Administration - Delete Category';

    $scope.deleteCategory = function(){
        var request = {
            method: 'DELETE',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories/' + $scope.deleteCategoryId,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                console.log(data);
                //success(data['message']);
            })
            .error(function(data){
                error('Error delete category');
                console.log(data);
            }
        );
    };


    $scope.backToCategories = function(){
        $location.path('admin/categories/list');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);