'use strict';

adsApp.factory('categoriesData', ['$http', function($http){
    function getAllCategories(){
        return $http.get('http://softuni-ads.azurewebsites.net/api/categories');
    };

    return {
        getAllCategories: getAllCategories
    }
}]);