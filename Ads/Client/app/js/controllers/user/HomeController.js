'use strict';

adsApp.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
        $('<li class="active"><a href="#/user/ads/">My Ads</a></li>').appendTo('.navigation ul');
        $('<li class="active"><a href="#/user/ads/publish">Publish Ad</a></li>').appendTo('.navigation ul');
        $('<li class="active"><a href="#/user/profile">Edit Profile</a></li>').appendTo('.navigation ul');
    }

    $scope.pageTitle = "Home";
    $scope.bigCurrentPage = 1;
    $scope.maxSize = 8;

    $scope.getAllAds = function(){
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
            .success(function(data) {
                console.log(data);
                $scope.bigTotalItems = data['numItems'];
                $scope.ads = data['ads'];
            })
            .error(function() {
                error('Error occurred when get ads');
            }
        );
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

    $scope.getAdsByCategoryId = function(id){
      $http.get('http://softuni-ads.azurewebsites.net/api/ads?CategoryId=' + id)
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
            $http.get('http://softuni-ads.azurewebsites.net/api/ads?CategoryId=' + $scope.categoryId + '&townId=' + id)
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
            $http.get('http://softuni-ads.azurewebsites.net/api/ads?townId=' + id)
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

    $scope.getAllAds();

    $scope.setPage = function(pageNo){
        $scope.bigCurrentPage = pageNo;

        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + $scope.bigCurrentPage,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {

            }
        }

        $http(request)
            .success(function(data) {
                $scope.ads = data['ads'];
                $scope.bigTotalItems = data['numItems'];

            })
            .error(function() {
                error('Cannot get ads');
            });
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/');
    };
}]);