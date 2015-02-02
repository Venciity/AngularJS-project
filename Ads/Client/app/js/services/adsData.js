'use strict';

adsApp.factory('adsData', ['$http', function($http){
    function getAllAds(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/ads');
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

    function createAd(title, text, image, category, town){
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

        return $http(request);
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
        getAdsByCategoryId: getAdsByCategoryId,
        getAdsByCategoryIdAndTownId: getAdsByCategoryIdAndTownId,
        getAdsByTownId: getAdsByTownId,
        getPage: getPage,
        createAd: createAd
    }

}]);