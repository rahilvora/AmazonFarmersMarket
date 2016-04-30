/**
 * Controller for Login
 **/

var loginApp = angular.module('loginApp', []);

loginApp.controller('LoginController', function ($scope, $http) {
    console.log("inside login");
    $scope.existingUserName = true;
    $scope.unexpected_error = true;

    /** Customer Login Function **/
    $scope.customerLogin = function () {
        //("In Customer Login function");
        $http({
            method: "POST",
            url : 'api/checkCustomerLogin',
            data: {
                "email" : $scope.email,
                "password" : $scope.password
            }
        }).success(function(data) {
            if(data.statusCode=="validLogin"){
                window.location.assign("/shop/customerHome");
            }
            else if (data.statusCode == "invalidLogin"){
                $scope.existingUserName = false;
            }
        }).error(function(error) {
            $scope.unexpected_error = false;
        });
    };
    /** Customer Login Function Ends**/

    /** Farmer Login Function **/
    $scope.farmerLogin = function () {
        $http({
            method: "POST",
            url : 'api/checkFarmerLogin',
            data: {
                "email" : $scope.email,
                "password" : $scope.password
            }
        }).success(function(data) {
            if(data.statusCode=="validLogin"){
                window.location.assign("/shop/customerHome");
            }
            else if (data.statusCode == "invalidLogin"){
                $scope.existingUserName = false;
            }
        }).error(function(error) {
            $scope.unexpected_error = false;
        });
    }

    /** Farmer Login Function Ends**/
});