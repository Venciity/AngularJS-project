'use strict';

adsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {

    if(sessionStorage.length > 0){
        $scope.username = sessionStorage.username;
        $scope.logout = 'Logout';
        //$('<a href="" id="logoutUser" class="pull-right">logout</a>').appendTo('header');
        //$('<p class="pull-right username">{{ username }}</p>').appendTo('header');
        $('<li class="active"><a href="#">My Ads</a></li>').appendTo('.navigation ul');
        $('<li class="active"><a href="#">Publish New Ad</a></li>').appendTo('.navigation ul');
        $('<li class="active"><a href="#">Edit Profile</a></li>').appendTo('.navigation ul');
    }

    $scope.pageTitle = "Home";

    $http.get('http://softuni-ads.azurewebsites.net/api/ads')
        .success(function(data) {
            $scope.ads = data['ads'];
        })
        .error(function() {
            console.log('Error when get ads')
        }
    );

    $http.get('http://softuni-ads.azurewebsites.net/api/categories')
        .success(function(data){
            $scope.categories = data;
        })
        .error(function(){
            console.log('Error when get categories');
        }
    );

    $http.get('http://softuni-ads.azurewebsites.net/api/towns')
        .success(function(data){
            $scope.towns = data;
        })
        .error(function(){
            console.log('Error when get towns');
        }
    );

}]);