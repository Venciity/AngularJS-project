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

    function getPage(bigCurrentPage){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + bigCurrentPage,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {

            }
        };

        return $http(request);
    };

    return {
        getAllAds: getAllAds,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        getAdsByCategoryId: getAdsByCategoryId,
        getAdsByCategoryIdAndTownId: getAdsByCategoryIdAndTownId,
        getAdsByTownId: getAdsByTownId,
        getPage: getPage
    }

}]);