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

    $scope.getAllTowns();

    $scope.editTown = function(town){
        $rootScope.editTown = town;
        $location.path('/admin/towns/edit');
    };

    $scope.deleteTown = function(town){
        $rootScope.deleteTown = town;
        $location.path('/admin/towns/delete');
    };

    $scope.createTown = function(){
        $location.path('/admin/towns/create');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);