/**
 * Created by Ventsislav on 2.1.2015 г..
 */

adsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {

    $http.get('http://softuni-ads.azurewebsites.net/api/ads').
        success(function(data) {
            console.log(data);
            $scope.ads = data['ads'];
        }).
        error(function() {
            console.log('Error')
        }
    );
}]);