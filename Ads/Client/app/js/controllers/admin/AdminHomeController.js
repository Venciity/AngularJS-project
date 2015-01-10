'use strict';

adsApp.controller('AdminHomeController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

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

    $scope.approveAd = function(id){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/approve/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(){
                success('Successfully approve ad');
                $scope.getAllAds();
            })
            .error(function(){
                error('Error occurred when approve ad');
            }
        );
    };

    $scope.rejectAd = function(id){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/reject/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        $http(request)
            .success(function(){
                success('Successfully reject ad');
                $scope.getAllAds();
            })
            .error(function(){
                error('Error occurred when reject ad');
            }
        );
    };

    $scope.deleteAd = function(id){
        $rootScope.deleteAdIdByAdmin = id;
        $location.path('/admin/ads/delete');
    };

    $scope.editAd = function(id){
        $rootScope.editAdIdByAdmin = id;
        $location.path('/admin/ads/edit');
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

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);