'use strict';

adsApp.controller('AdminUsersController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }


    $scope.pageTitle = 'Administration - Users';

    $scope.getAllUsers = function(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/users',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                $scope.users = data['users'];
            })
            .error(function(data){
                error('Error get All users by admin');
                console.log(data);
            }
        );
    };

    $scope.getAllUsers();

    $scope.editUser = function(user){
        $rootScope.editUser = user;
        $location.path('/admin/users/edit');
    };

    $scope.deleteUser = function(user){
        $rootScope.user = user;
        $location.path('/admin/users/delete');
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);