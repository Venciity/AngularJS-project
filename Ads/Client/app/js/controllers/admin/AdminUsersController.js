'use strict';

adsApp.controller('AdminUsersController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }

    $('.navigation ul li:nth-child(2)').addClass('active');

    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;

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
                $scope.bigTotalItems = data['numItems'];
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

    $scope.setPage = function(pageNo){
        $scope.bigCurrentPage = pageNo;

        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/users?StartPage=' + $scope.bigCurrentPage,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {

            }
        };

        $http(request)
            .success(function(data) {
                $scope.users = data['users'];
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