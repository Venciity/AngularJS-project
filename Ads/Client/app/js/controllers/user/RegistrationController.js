'use strict';

adsApp.controller('RegistrationController',['$scope', '$location', 'townsData', 'userData',
    function ($scope, $location, townsData, userData){

        $scope.pageTitle = "Registration";

        var allTownsPromise = townsData.getAllTowns();
        allTownsPromise
            .success(function(data){
                $scope.towns = data;
            })
            .error(function(){
                error('Error occurred when get towns');
            }
        );

        $scope.registerUser = function(){
            var registerUserPromise =
                userData.registerUser($scope.registrationUsername,$scope.registrationPassword,
                    $scope.registrationConfirmPassword, $scope.registrationName, $scope.registrationEmail,
                    $scope.registrationPhone, $scope.registrationTown);
            registerUserPromise
              .success(function(data){
                  //console.log(data);

                  var loginUserPromise = userData.loginUser($scope.registrationUsername, $scope.registrationPassword);

                    loginUserPromise
                      .success(function(data){
                          //console.log(data);
                          success('Success login');
                          sessionStorage.accessToken = data.access_token;
                          sessionStorage.username = data.username;
                          $location.path('/');
                      })
                      .error(function(data){
                          console.log(data);
                          error('Login Error');
                      });


                  success('Success registration');
                  $location.path('/login');
              })
              .error(function(data){
                  console.log(data);
                  error(data['message']);
                  console.log('Register user error');
              });
        };

    }
]);