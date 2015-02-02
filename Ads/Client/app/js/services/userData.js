'use strict';

adsApp.factory('userData', ['$http', function($http){
    function getUserInfo(){
        var request = {
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {}
        };

        return $http(request);
    };

    function editUserProfile(updateName, updateEmail, updatePhone, updateTown){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'name': updateName,
                'email': updateEmail,
                'phoneNumber': updatePhone,
                'townId': updateTown
            }
        };

        return $http(request);
    };

    function changeUserPassword(oldPassword, newPassword, confirmPassword){
        var request = {
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/changepassword',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                'oldPassword': oldPassword,
                'newPassword': newPassword,
                'confirmPassword': confirmPassword
            }
        };

        return $http(request);
    };

    function loginUser(loginUsername, loginPassword){
        return $http.post('http://softuni-ads.azurewebsites.net/api/user/login', {
            username: loginUsername,
            password: loginPassword
        });
    };

    return {
        getUserInfo: getUserInfo,
        editUserProfile: editUserProfile,
        changeUserPassword: changeUserPassword,
        loginUser: loginUser
    }
}]);