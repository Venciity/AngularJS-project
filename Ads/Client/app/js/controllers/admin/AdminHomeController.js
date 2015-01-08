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
                console.log(data['ads']);
            })
            .error(function(data){
                error('Error get All ads by admin');
                console.log(data);
            }
        );
    };

    $scope.getAllAds();

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
                console.log(data['ads']);
            })
            .error(function(data){
                error('Error get All ads by admin');
                console.log(data);
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

}]);