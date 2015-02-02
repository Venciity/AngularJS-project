'use strict';

adsApp.controller('PublishNewAdController',['$scope', '$http', '$location', 'townsData', 'categoriesData', 'adsData',
    function($scope, $http, $location, townsData, categoriesData, adsData){
        $scope.pageTitle = 'Publish New Ad';
        $scope.adData = {townId: null, categoryId: null};

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

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

        $scope.createAd = function(){
            var title = $scope.newAdTitle;
            var text = $scope.newAdText;
            var image = $scope.adData.imageDataUrl;
            var category = $scope.newAdCategory;
            var town = $scope.newAdTown;

           var createAdPromise = adsData.createAd(title, text, image, category, town);

            createAdPromise
                .success(function(){
                    success('Advertisement submitted for approval. Once approved, it will be published.');
                    $location.path('/user/ads');
                })
                .error(function(data){
                    error(data['message']);
                }
            );
        };

        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/#');
        };
    }
]);