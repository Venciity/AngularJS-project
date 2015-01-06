'use strict';

adsApp.controller('PublishNewAdController',['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.pageTitle = 'Publish New Ad';
    $scope.adData = {townId: null, categoryId: null};

    $(document).ready(function(){
        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }
    });

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

    $scope.createAd = function(){
        var title = $scope.newAdTitle;
        var text = $scope.newAdText;
        var image = $scope.adData.imageDataUrl;
        var category = $scope.newAdCategory;
        var town = $scope.newAdTown;

        var request = {
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'title': title,
                'text': text,
                'imageDataUrl': image,
                'categoryId': category,
                'townId': town
            }

        };

        $http(request)
            .success(function(data){
                console.log(data);
                success('Advertisement submitted for approval. Once approved, it will be published.');
                $location.path('/user/ads');
            })
            .error(function(data){
                console.log(data);
                error('Publish new ad error');
            })
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

}]);