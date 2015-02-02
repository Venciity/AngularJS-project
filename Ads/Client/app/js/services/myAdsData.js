'use strict';

adsApp.factory('myAdsData', ['$http', function($http){

    function getMyAds(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        return $http(request);
    };

    function getMyAdsByStatus(status){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads?status=' + status,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        return $http(request);
    };

    function deactivateAd(id){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        return $http(request);
    };

    function publishAgainAd(id){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/' + id,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        return $http(request);
    };

    function getPage(bigCurrentPage){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads?StartPage=' + bigCurrentPage,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {

            }
        };

        return $http(request);
    };

    return {
        getMyAds: getMyAds,
        getMyAdsByStatus: getMyAdsByStatus,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        getPage: getPage
    }

}]);