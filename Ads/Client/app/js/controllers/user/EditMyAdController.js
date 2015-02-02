'use strict';

adsApp.controller('EditMyAdController', ['$http', '$scope', '$location', '$rootScope', 'townsData', 'categoriesData', 'myAdsData',
    function($http, $scope, $location, $rootScope, townsData, categoriesData,  myAdsData){
        $scope.adData = {};
        $scope.pageTitle = 'Edit Ad';

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

        $scope.getAdToBeEdited = function(){
            var adToBeEditedPromise = myAdsData.getAdToBeEdited($rootScope.editAdId);

            adToBeEditedPromise
                .success(function(data){
                    $scope.ad = data;
                    $scope.editTitle = data.title;
                    $scope.editText = data.text;
                    $scope.editCategory = data.categoryId;
                    $scope.editTown = data.townId;
                })
                .error(function(data){
                    console.log(data);
                }
            );
        };

        $scope.getAdToBeEdited();

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

        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".preview-image").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".preview-image").html("<p>File type not supported!</p>");
            }
        };

        $scope.editAd = function(){
            if($scope.adData.imageDataUrl){
                var image = $scope.adData.imageDataUrl;
                var changeImage = true;
            }
            else {
                var changeImage = false;
            }

            var editAdPromise =
                myAdsData.editAd($rootScope.editAdId, $scope.editTitle, $scope.editText,
                    changeImage, image, $scope.editCategory, $scope.editTown);

            editAdPromise
                .success(function(){
                    success('Successfully edited ad');
                    $location.path('/user/ads');
                })
                .error(function(){
                    error('Error edit ad');
                }
            );
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