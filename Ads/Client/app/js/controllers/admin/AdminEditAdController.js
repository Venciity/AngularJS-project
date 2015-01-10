'use strict';

adsApp.controller('AdminEditAdController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.adData = {};
        $scope.pageTitle = 'Administration Edit Ad';

        if(sessionStorage.length > 0){
            $scope.username = sessionStorage.username;
            $scope.logout = 'Logout';
        }

        $scope.getAdToBeEdited = function(){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + $rootScope.editAdIdByAdmin,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(data){
                    $scope.ad = data;
                    console.log(data);
                    $scope.editTitle = data.title;
                    $scope.editText = data.text;
                    $scope.editCategory = data.categoryId;
                    $scope.editTown = data.townId;
                    $scope.editUsername = data.ownerUsername;
                    $scope.editDate = data.date;
                    $scope.editStatus = data.status;
                })
                .error(function(data){
                    console.log(data);
                }
            );
        };

        $scope.getAdToBeEdited();

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

            var request = {
                method: 'PUT',
                url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + $rootScope.editAdIdByAdmin,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {
                    'title' : $scope.editTitle,
                    'text': $scope.editText,
                    'changeImage': changeImage,
                    'ImageDataURL': image,
                    'categoryId': $scope.editCategory,
                    'townId': $scope.editTown,
                    'date': $scope.editDate,
                    'status': $scope.editStatus
                }
            };

            $http(request)
                .success(function(){
                    success('Successfully edited ad');
                    $location.path('/admin/home');
                })
                .error(function(){
                    error('Error edit ad');
                }
            );
        };

        $scope.backToAds = function(){
            $location.path('/admin/home');
        };

        $scope.logoutUser = function(){
            sessionStorage.clear();
            success('Successfully logout');
            $location.path('/');
        };
    }
]);