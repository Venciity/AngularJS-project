'use strict';

adsApp.controller('DeleteMyAdController', ['$scope', '$location', '$rootScope', 'myAdsData',
    function($scope, $location, $rootScope, myAdsData){
        $scope.pageTitle = 'Delete Ad';

        $scope.getAdToBeDeleted = function(){
            var getAdToBeDeletedPromise = myAdsData.getAdToBeDeleted($rootScope.deleteAdId);

            getAdToBeDeletedPromise
                .success(function(data){
                    $scope.ad = data;
                })
                .error(function(data){
                    console.log(data);
                })
        };

        $scope.getAdToBeDeleted();

        $scope.deleteAd = function(){
            var deleteAdPromise = myAdsData.deleteAd($rootScope.deleteAdId);

            deleteAdPromise
                .success(function(){
                    success('Successful deleted ad');
                    $location.path('/user/ads');
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when delete ad');
                })
        };

        $scope.backToMyAds = function(){
            $location.path('/user/ads');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);