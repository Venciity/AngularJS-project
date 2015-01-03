/**
 * Created by Ventsislav on 2.1.2015 г..
 */

adsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {

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