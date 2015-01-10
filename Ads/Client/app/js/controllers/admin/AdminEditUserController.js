'use strict';

adsApp.controller('AdminEditUserController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.pageTitle = 'Administration - Edit User Profile';

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
            .success(function(data){
                $scope.towns = data;
            })
            .error(function(){
                error('Error occurred when get towns');
            }
        );

        $scope.userInfo = $rootScope.user;
        $scope.editUsername = $rootScope.editUser['username'];
        $scope.updateName = $rootScope.editUser['name'];
        $scope.updateEmail = $rootScope.editUser['email'];
        $scope.updatePhone = $rootScope.editUser['phoneNumber'];
        $scope.updateTown = $rootScope.editUser['townId'];


        $scope.editUserProfile = function(){
            var request = {
                method: 'PUT',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/user/' + $scope.editUsername,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {
                    'name': $scope.updateName,
                    'email': $scope.updateEmail,
                    'phoneNumber': $scope.updatePhone,
                    'townId': $scope.updateTown,
                    'isAdmin': $scope.isAdmin
                }
            };

            $http(request)
                .success(function(){
                    success('Successfully edited profile.');
                })
                .error(function(){
                    error('Error edit profile');
                }
            );
        };

        $scope.changeUserPassword = function(){
            var request = {
                method: 'PUT',
                url: 'http://softuni-ads.azurewebsites.net/api/user/changepassword',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {
                    'oldPassword': $scope.oldPassword,
                    'newPassword': $scope.newPassword,
                    'confirmPassword': $scope.confirmPassword
                }
            };

            $http(request)
                .success(function(){
                    success('Successfully changed password.');
                })
                .error(function(){
                    error('Error occurred when changed password.');
                }
            );
        };

        $scope.cancel = function(){
            $location.path('/admins/users/list');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);