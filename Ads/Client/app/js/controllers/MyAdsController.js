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
                console.log(data);
            })
            .error(function(data){
                console.log(data);
                error('Error load my ads');
            }
        );

    };

    $scope.loadMyAds();

}]);