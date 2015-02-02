'use strict';

adsApp.controller('HomeController', ['$scope', '$location', 'townsData', 'categoriesData', 'adsData',
    function($scope, $location, townsData, categoriesData, adsData) {

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

    var allCategoriesPromise = categoriesData.getAllCategories();
    allCategoriesPromise
        .success(function(data){
            $scope.categories = data;
        })
        .error(function(){
            error('Error occurred when get categories');
        }
    );

    var allTownsPromise = townsData.getAllTowns();
    allTownsPromise
        .success(function(data){
            $scope.towns = data;
        })
        .error(function(){
            error('Error occurred when get towns');
        }
    );

    $scope.getAdsByCategoryId = function(id){
        var adsByCategoryIdPromise = adsData.getAdsByCategoryId(id);
        adsByCategoryIdPromise
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
            var getAdsByCategoryIdAndTownIdPromise = adsData.getAdsByCategoryIdAndTownId($scope.categoryId, id);
            getAdsByCategoryIdAndTownIdPromise
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
            var getAdsByTownIdPromise = adsData.getAdsByTownId(id);
            getAdsByTownIdPromise
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

    var adsAllPromise = adsData.getAllAds();
    adsAllPromise
        .success(function(data){
            $scope.ads = data['ads'];
            $scope.bigTotalItems = data['numItems'];
        })
        .error(function(){
           error('Error occurred when get all ads');
        }
    );

    $scope.setPage = function(pageNo){
        $scope.bigCurrentPage = pageNo;

        var pagePromise = adsData.getPage($scope.bigCurrentPage);

        pagePromise
            .success(function(data) {
                $scope.ads = data['ads'];
                $scope.bigTotalItems = data['numItems'];

            })
            .error(function() {
                error('Cannot get ads');
            }
        );
    };

    $scope.logoutUser = function(){
        sessionStorage.clear();
        success('Successfully logout');
        $location.path('/#');
    };
}]);