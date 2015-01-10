'use strict';

adsApp.controller('AdminCreateTownController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.pageTitle = 'Administration - Create Town';

    $scope.createTown = function(){
        var request = {
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/towns',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'name': $scope.newTown
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


    $scope.backToTowns = function(){
        $location.path('admin/towns/list');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);