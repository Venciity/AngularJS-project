'use strict';

adsApp.controller('AdminCreateCategoryController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.pageTitle = 'Administration - Create Category';

    $scope.createCategory = function(){
        var request = {
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'name': $scope.newCategory
            }
        };

        $http(request)
            .success(function(data){
                success(data['message']);
            })
            .error(function(data){
                error(data['message']);
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
        $location.path('/#');
    };
}]);