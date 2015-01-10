'use strict';

adsApp.controller('AdminDeleteTownController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $scope.deleteTownId = $rootScope.deleteTown['id'];
    $scope.deleteTownName = $rootScope.deleteTown['username'];

    $scope.pageTitle = 'Administration - Delete Town';

    $scope.deleteTown = function(){
        var request = {
            method: 'DELETE',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/towns/' + $scope.deleteTownId,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                console.log(data);
                success(data['message']);
            })
            .error(function(data){
                error('Error delete Town');
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
        $location.path('/#');
    };
}]);