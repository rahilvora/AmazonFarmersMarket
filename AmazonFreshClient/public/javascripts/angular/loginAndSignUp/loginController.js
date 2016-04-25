/**
 * Controller for Login
 **/

var loginApp = angular.module('loginApp', []);

loginApp.controller('LoginController', function ($scope, $http) {
    console.log("inside login");
    $scope.existingUserName = true;
    $scope.unexpected_error = true;

    /** Login Function **/
    $scope.login = function () {
        $http({
            method: "POST",
            url : '/login/checkLogin',
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
    /** Login Function Ends**/
});