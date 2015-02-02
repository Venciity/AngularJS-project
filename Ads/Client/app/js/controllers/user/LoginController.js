'use strict';

adsApp.controller('LoginController',['$scope','$location', 'userData',
    function($scope, $location, userData){
        $scope.pageTitle = "Login";
        $scope.loginUser = function(){
            var loginUserPromise = userData.loginUser($scope.loginUsername, $scope.loginPassword);
            loginUserPromise
                .success(function(data){
                    success('Success login');
                    sessionStorage.accessToken = data.access_token;
                    sessionStorage.username = data.username;
                    if (data['isAdmin'] == 'true'){
                        $location.path('/admin/home');
                    }
                    else {
                        $location.path('/');
                    }
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when the user trying to login');
                })
        }
    }
]);