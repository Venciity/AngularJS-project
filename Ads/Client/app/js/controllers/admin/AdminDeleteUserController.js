'use strict';

adsApp.controller('AdminDeleteUserController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.pageTitle = 'Administration Delete User';

        $scope.user = $rootScope.user;

        $scope.deleteUser = function(){
            var request = {
                method: 'DELETE',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/user/' + $scope.user['username'],
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(){
                    success('Successful deleted user');
                    $location.path('/admin/users/list');
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when delete user');
                }
            );
        };

        $scope.backToUsers = function(){
            $location.path('/admin/users/list');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);