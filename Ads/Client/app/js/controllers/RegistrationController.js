'use strict';

adsApp.controller('RegistrationController',['$scope', '$http', '$location', function ($scope, $http, $location){

    $scope.pageTitle = "Registration";

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
              success('Success registration');
              $location.path('/login');
          })
          .error(function(data){
              console.log(data);
              error('Registration Error');
              console.log('Register user error');
          });
    };

}]);