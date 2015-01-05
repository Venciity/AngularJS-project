'use strict';

adsApp.controller('MyAdsController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.pageTitle = 'My Ads';

    $(document).ready(function(){
        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }
    });

    $scope.loadMyAds = function(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        }

        $http(request)
            .success(function(data){
                $scope.ads = data['ads'];
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

    $scope.deactivateAd = function(id){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
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
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(){
                success('Success published again ad.');
                $scope.loadMyAds();
            })
            .error(function(){
                error('Error occurred when published again ad');
            }
        );
    }

}]);