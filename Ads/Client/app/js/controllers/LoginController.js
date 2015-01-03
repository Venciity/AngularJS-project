'use strict';

adsApp.controller('LoginController',['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.loginUser = function(){
        $http.post('http://softuni-ads.azurewebsites.net/api/user/login', {
            username: $scope.loginUsername,
            password: $scope.loginPassword
        })
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log(data);
            })
    }
}]);