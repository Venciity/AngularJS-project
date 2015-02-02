'use strict';

adsApp.factory('townsData', ['$http', function($http){
    function getAllTowns(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/towns');
    };

    return {
        getAllTowns: getAllTowns
    }
}]);