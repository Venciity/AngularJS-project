'use strict';

adsApp.controller('AdminEditCategoryController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.editCategoryId = $rootScope.editCategory['id'];
    $scope.editCategoryName = $rootScope.editCategory['username'];

    $scope.pageTitle = 'Administration - Delete Category';

    $scope.editCategory = function(){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories/' + $scope.editCategoryId,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'name': $scope.editCategoryName
            }
        };

        $http(request)
            .success(function(data){
                console.log(data);
                success('Successfully edited category');
                $location.path('admin/categories/list');
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
        $location.path('/#');
    };
}]);