'use strict';

adsApp.controller('AdminDeleteAdController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.pageTitle = 'Administration Delete Ad';

        $scope.getAdToBeDeleted = function(){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + $rootScope.deleteAdIdByAdmin,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(data){
                    $scope.ad = data;
                })
                .error(function(data){
                    console.log(data);
                }
            );
        };

        $scope.getAdToBeDeleted();

        $scope.deleteAd = function(){
            var request = {
                method: 'DELETE',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + $rootScope.deleteAdIdByAdmin,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(){
                    success('Successful deleted ad');
                    $location.path('/admin/home');
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when delete ad');
                })
        };

        $scope.backToAds = function(){
            $location.path('/admin/home');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);