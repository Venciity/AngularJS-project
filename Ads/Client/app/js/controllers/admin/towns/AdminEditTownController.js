'use strict';

adsApp.controller('AdminEditTownController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.editTownId = $rootScope.editTown['id'];
    $scope.editTownName = $rootScope.editTown['username'];

    $scope.pageTitle = 'Administration - Edit Category';

    $scope.editTown = function(){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/towns/' + $scope.editTownId,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'name': $scope.editTownName
            }
        };

        $http(request)
            .success(function(data){
                console.log(data);
                success('Successfully edited town');
                $location.path('admin/categories/list');
                //success(data['message']);
            })
            .error(function(data){
                error('Error edit town');
                console.log(data);
            }
        );
    };


    $scope.backToTowns = function(){
        $location.path('admin/towns/list');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);