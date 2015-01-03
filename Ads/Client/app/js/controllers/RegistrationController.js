'use strict';

adsApp.controller('RegistrationController',['$scope', '$http', function ($scope, $http){
    $http.get('http://softuni-ads.azurewebsites.net/api/towns')
        .success(function(data){
            $scope.towns = data;
        })
        .error(function(){
            console.log('Error when get towns');
        }
    );

    $scope.registerUser = function(){
      $http.post('http://softuni-ads.azurewebsites.net/api/user/register', {
          username: $scope.registrationUsername,
          password: $scope.registrationPassword,
          confirmPassword: $scope.registrationConfirmPassword,
          name: $scope.registrationName,
          email: $scope.registrationEmail,
          phone: $scope.registrationPhone,
          town: $scope.registrationTown
      })
          .success(function(data){
              console.log(data);
          })
          .error(function(data){
              console.log(data);
          });
    };

}]);