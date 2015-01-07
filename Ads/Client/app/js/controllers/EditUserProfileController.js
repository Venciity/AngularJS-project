'use strict';

adsApp.controller('EditUserProfileController', ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $scope.pageTitle = 'Edit User Profile';

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

        $scope.getUserInfo = function(){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(data){
                    $scope.userInfo = data;
                })
                .error(function(){
                    error('Error get user info');
                }
            );
        };

        $scope.getUserInfo();

        $scope.editUserProfile = function(){
            var request = {
                method: 'PUT',
                url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {
                    'name': $scope.updateName,
                    'email': $scope.updateEmail,
                    'phoneNumber': $scope.updatePhone,
                    'townId': $scope.updateTown
                }
            };

            $http(request)
                .success(function(){
                    success('Successfully updated profile.');
                })
                .error(function(){
                    error('Error update profile');
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

    }
]);