'use strict';

adsApp.factory('adsData', ['$http', function($http){

    function getAllAds(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/ads');
    };

    function getAllCategories(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/categories');
    };

    function getAllTowns(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/towns');
    };

    function getAdsByCategoryId(id){
        return $http.get('http://softuni-ads.azurewebsites.net/api/ads?CategoryId=' + id);
    };

    function getAdsByCategoryIdAndTownId(categoryId, townId){
        return $http.get('http://softuni-ads.azurewebsites.net/api/ads?CategoryId=' + categoryId + '&townId=' + townId);
    };

    function getAdsByTownId(id){
        return $http.get('http://softuni-ads.azurewebsites.net/api/ads?townId=' + id);
    };

    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        getAdsByCategoryId: getAdsByCategoryId,
        getAdsByCategoryIdAndTownId: getAdsByCategoryIdAndTownId,
        getAdsByTownId: getAdsByTownId
    }

}]);