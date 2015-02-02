'use strict';

adsApp.controller('MyAdsController', ['$scope', '$location', '$rootScope', 'myAdsData',
    function($scope, $location, $rootScope, myAdsData){
    $scope.pageTitle = 'My Ads';

    $(document).ready(function(){
        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }
    });

    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;

    $scope.loadMyAds = function(){
        var myAdsPromise = myAdsData.getMyAds();

        myAdsPromise
            .success(function(data){
                $scope.ads = data['ads'];
                $scope.bigTotalItems = data['numItems'];
                for (var ad in data['ads']){
                    var currentAd  = data['ads'][ad];
                    if (currentAd.status === 'WaitingApproval' || currentAd.status === 'Published'){
                        currentAd.firstButtonClass = 'btn btn-warning';
                        currentAd.firstButtonText = 'Deactivate';
                        currentAd.secondButtonClass = 'hidden';
                        currentAd.thirdButtonClass = 'hidden';
                        currentAd.fourthButtonClass = 'hidden';
                    }
                    else if (currentAd.status === 'Inactive'){
                        currentAd.firstButtonClass = 'hidden';
                        currentAd.secondButtonClass = 'btn btn-default';
                        currentAd.secondButtonText = 'Edit';
                        currentAd.thirdButtonClass = 'btn btn-success';
                        currentAd.thirdButtonText = 'Publish Again';
                        currentAd.fourthButtonClass = 'btn btn-danger';
                        currentAd.fourthButtonText = 'Delete';
                    }
                }
            })
            .error(function(data){
                console.log(data);
                error('Error load my ads');
            }
        );
    };

    $scope.loadMyAds();

    $scope.loadMyAdsByStatus = function(status){
        var getMyAdsByStatusPromise = myAdsData.getMyAdsByStatus(status);

        getMyAdsByStatusPromise
            .success(function(data){
                $scope.ads = data['ads'];
                $scope.bigTotalItems = data['numItems'];
                for (var ad in data['ads']){
                    var currentAd  = data['ads'][ad];
                    if (currentAd.status === 'WaitingApproval' || currentAd.status === 'Published'){
                        currentAd.firstButtonClass = 'btn btn-warning';
                        currentAd.firstButtonText = 'Deactivate';
                        currentAd.secondButtonClass = 'hidden';
                        currentAd.thirdButtonClass = 'hidden';
                        currentAd.fourthButtonClass = 'hidden';
                    }
                    else if (currentAd.status === 'Inactive'){
                        currentAd.firstButtonClass = 'hidden';
                        currentAd.secondButtonClass = 'btn btn-default';
                        currentAd.secondButtonText = 'Edit';
                        currentAd.thirdButtonClass = 'btn btn-success';
                        currentAd.thirdButtonText = 'Publish Again';
                        currentAd.fourthButtonClass = 'btn btn-danger';
                        currentAd.fourthButtonText = 'Delete';
                    }
                }
            })
            .error(function(data){
                console.log(data);
                error('Error load my ads by status');
            }
        );

    };

    $scope.deactivateAd = function(id){
        var deactivateAdPromise = myAdsData.deactivateAd(id);

        deactivateAdPromise
            .success(function(){
                success('Success deactivated ad.');
                $scope.loadMyAds();
            })
            .error(function(){
                error('Error occurred when deactivated ad');
            }
        );
    };

    $scope.publishAgainAd = function(id){
        var publishAgainAdPromise = myAdsData.publishAgainAd(id);

        publishAgainAdPromise
            .success(function(){
                success('Success published again ad.');
                $scope.loadMyAds();
            })
            .error(function(){
                error('Error occurred when published again ad');
            }
        );
    };

    $scope.deleteAd = function(id){
        $rootScope.deleteAdId = id;
        $location.path('/user/ads/delete');
    };

    $scope.editAd = function(id){
        $rootScope.editAdId = id;
        $location.path('/user/ads/edit');
    };

    $scope.setPage = function(pageNo){
        $scope.bigCurrentPage = pageNo;

        var getPagePromise = myAdsData.getPage($scope.bigCurrentPage);

        getPagePromise
            .success(function(data) {
                $scope.ads = data['ads'];
                $scope.bigTotalItems = data['numItems'];
                for (var ad in data['ads']){
                    var currentAd  = data['ads'][ad];
                    if (currentAd.status === 'WaitingApproval' || currentAd.status === 'Published'){
                        currentAd.firstButtonClass = 'btn btn-warning';
                        currentAd.firstButtonText = 'Deactivate';
                        currentAd.secondButtonClass = 'hidden';
                        currentAd.thirdButtonClass = 'hidden';
                        currentAd.fourthButtonClass = 'hidden';
                    }
                    else if (currentAd.status === 'Inactive'){
                        currentAd.firstButtonClass = 'hidden';
                        currentAd.secondButtonClass = 'btn btn-default';
                        currentAd.secondButtonText = 'Edit';
                        currentAd.thirdButtonClass = 'btn btn-success';
                        currentAd.thirdButtonText = 'Publish Again';
                        currentAd.fourthButtonClass = 'btn btn-danger';
                        currentAd.fourthButtonText = 'Delete';
                    }
                }
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