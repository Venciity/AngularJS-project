'use strict';

adsApp.controller('DeleteMyAdController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.pageTitle = 'Delete Ad';

        $scope.getAdToBeDeleted = function(){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + $rootScope.deleteAdId,
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
                })
        };

        $scope.getAdToBeDeleted();

        $scope.deleteAd = function(){
            var request = {
                method: 'DELETE',
                url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + $rootScope.deleteAdId,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(){
                    success('Successful deleted ad');
                    $location.path('/user/ads');
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when delete ad');
                })
        }
    }
]);