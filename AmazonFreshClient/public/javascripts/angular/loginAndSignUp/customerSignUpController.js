var signUp = angular.module('signUp', []);

signUp.controller('CustomerSignUpController', function ($scope, $http) {
    console.log("Inside CustomerSignUpController -> customerSignUpController.js");
    $scope.showSignupForm = false;
    $scope.showSignupSuccess = true;
    $scope.existingUserName = true;
    $scope.unexpected_error = true;
    $scope.zipPattern = /^(?=[0-9][0-9][0-9][0-9][0-9])|(?=[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])$/;

    $scope.customerSignUp = function () {
        $http({
            method: "POST",
            url: 'api/createCustomer',
            data: {
                "firstname": $scope.firstname,
                "lastname": $scope.lastname,
                "email": $scope.email,
                "password": $scope.password,
                "customerid": $scope.customerid,
                "ccnumber": $scope.ccnumber,
                "address": $scope.address,
                "city":$scope.city,
                "state": $scope.state,
                "zipcode": $scope.zipcode,
                "phonenumber": $scope.phonenumber
            }
        }).success(function (data) {
            if (data.statusCode == "customerCreated") {
                $scope.showSignupForm = true;
                $scope.showSignupSuccess = false;
                window.location.assign('/login');
            }
            else if (data.statusCode == "customerExists") {
                $scope.existingUserName = false;
            }
        }).error(function (error) {
            $scope.unexpected_error = false;
        });
    };
    /*$scope.home = function () {
        window.location.assign('/home');
    }*/
});