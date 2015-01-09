'use strict';

adsApp.controller('AdminHomeController', ['$scope', '$http', '$location', function($scope, $http, $location){

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
    }


    $scope.pageTitle = 'Administration Home';

    $scope.getAllAds = function(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(data){
                $scope.ads = data['ads'];
            })
            .error(function(data){
                error('Error get All ads by admin');
                console.log(data);
            }
        );
    };

    $scope.getAllAds();

    $scope.getAdsByCategoryId = function(id){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?CategoryId=' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };
        $http(request)
            .success(function(data){
                $scope.categoryId = id;
                $scope.ads = data['ads'];
            })
            .error(function(data){
                console.log(data);
                error('Error occurred when get Ads by categoryId!');
            }
        );
    };

    $scope.getAdsByTownId = function(id){
        if($scope.categoryId){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?CategoryId=' + $scope.categoryId + '&townId=' + id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };
            $http(request)
                .success(function(data){
                    $scope.ads = data['ads'];
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when get Ads by categoryId & TownId!');
                }
            );
        }
        else{
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?townId=' + id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };
            $http(request)
                .success(function(data){
                    $scope.ads = data['ads'];
                })
                .error(function(data){
                    console.log(data);
                    error('Error occurred when get Ads by categoryId & TownId!');
                }
            );
        }
    };

    $http.get('http://softuni-ads.azurewebsites.net/api/categories')
        .success(function(data){
            $scope.categories = data;
        })
        .error(function(){
            error('Error occurred when get categories');
        }
    );

    $http.get('http://softuni-ads.azurewebsites.net/api/towns')
        .success(function(data){
            $scope.towns = data;
        })
        .error(function(){
            error('Error occurred when get towns');
        }
    );

}]);