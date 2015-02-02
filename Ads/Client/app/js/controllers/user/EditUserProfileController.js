'use strict';

adsApp.controller('EditUserProfileController', ['$scope', '$http', '$location', 'townsData', 'myAdsData', 'userData',
    function($scope, $http, $location, townsData, myAdsData , userData){
        $scope.pageTitle = 'Edit User Profile';

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

        var allTownsPromise = townsData.getAllTowns();
        allTownsPromise
            .success(function(data){
                $scope.towns = data;
            })
            .error(function(data){
                error(data['message']);
            }
        );

        $scope.getUserInfo = function(){
            var getUserInfoPromise = userData.getUserInfo();

            getUserInfoPromise
                .success(function(data){
                    $scope.userInfo = data;
                    $scope.updateName = data.name;
                    $scope.updateEmail = data.email;
                    $scope.updatePhone = data.phoneNumber;
                    $scope.updateTown = data.townId;
                })
                .error(function(){
                    error('Error get user info');
                }
            );
        };

        $scope.getUserInfo();

        $scope.editUserProfile = function(){
            var editUserProfilePromise =
                userData.editUserProfile($scope.updateName, $scope.updateEmail, $scope.updatePhone, $scope.updateTown);

            editUserProfilePromise
                .success(function(data){
                    success(data['message']);
                })
                .error(function(data){
                    error(data['message']);
                }
            );
        };

        $scope.changeUserPassword = function(){
            var changeUserPasswordPromise =
                userData.changeUserPassword($scope.oldPassword, $scope.newPassword, $scope.confirmPassword);

            changeUserPasswordPromise
                .success(function(){
                    success('Successfully changed password.');
                })
                .error(function(){
                    error('Error occurred when changed password.');
                }
            );
        };

        $scope.backToHome = function(){
            $location.path('/#');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);