'use strict';

adsApp.controller('AdminHomeController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

        //$('.navigation ul li:nth-child(2)').removeClass('active');
        $('.navigation ul li:nth-child(1)').addClass('active');

        $scope.bigCurrentPage = 1;
        $scope.maxSize = 8;

        $scope.pageTitle = 'Administration Home';

        $scope.getAllAds = function(){
           // $('.categories ul li:nth-child(1)').addClass('active');

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
                    console.log(data);
                    $scope.ads = data['ads'];
                    $scope.bigTotalItems = data['numItems'];
                    $scope.numPages = data['numPages'];
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

        $scope.getAdsByStatus = function(status){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?status=' + status,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(data){
                    $scope.ads = data['ads'];
                    $scope.bigTotalItems = data['numItems'];
                    $scope.status = status;
                })
                .error(function(data){
                    console.log(data);
                    error('Error load ads by status');
                }
            );

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

        $scope.setPage = function(pageNo){
            $scope.bigCurrentPage = pageNo;

            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?StartPage=' + $scope.bigCurrentPage + '&status=' + $scope.status,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {

                }
            };

            $http(request)
                .success(function(data) {
                    console.log(data);
                    $scope.ads = data['ads'];
                    $scope.bigTotalItems = data['numItems'];
                    $scope.numPages = data['numPages'];
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
    }
]);