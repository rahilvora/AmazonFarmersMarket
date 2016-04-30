var signUp = angular.module('signUp', []);

signUp.controller('FarmerSignUpController', function ($scope, $http) {
    //console.log("Inside FarmerSignUpController -> farmerSignUpController.js");
    $scope.showSignupForm = false;
    $scope.showSignupSuccess = true;
    $scope.existingUserName = true;
    $scope.unexpected_error = true;
    $scope.zipPattern = /^(?=[0-9][0-9][0-9][0-9][0-9])|(?=[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])$/;

    $scope.farmerSignUp = function () {

        $http({
            method: "POST",
            url: 'api/createFarmer',
            data: {
                "firstname": $scope.firstname,
                "lastname": $scope.lastname,
                "email": $scope.email,
                "password": $scope.password,
                "farmerid": $scope.farmerid,
                "address": $scope.address,
                "city":$scope.city,
                "state": $scope.state,
                "zipcode": $scope.zipcode,
                "phonenumber": $scope.phonenumber
            }
        }).success(function (data) {
            if (data.statusCode == "farmerCreated") {
                $scope.showSignupForm = true;
                $scope.showSignupSuccess = false;
                window.location.assign('/login');
            }
            else if (data.statusCode == "farmerExists") {
                $scope.existingUserName = false;
            }
        }).error(function (error) {
            $scope.unexpected_error = false;
        });
    };
    /* $scope.home = function () {
     window.location.assign('/home');
     } */
});