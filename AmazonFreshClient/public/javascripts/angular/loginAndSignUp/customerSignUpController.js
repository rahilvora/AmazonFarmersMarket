var signUp = angular.module('signUp', []);

signUp.controller('CustomerSignUpController', function ($scope, $http) {
    //console.log("Inside CustomerSignUpController -> customerSignUpController.js");

    $scope.zipPattern = /^(?=[0-9][0-9][0-9][0-9][0-9])|(?=[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])$/;


    $scope.customerSignUp = function () {
        $scope.showSignupForm = false;
        $scope.showSignupSuccess = true;
        $scope.existingUserName = true;
        $scope.unexpected_error = true;

        $http({
            method: "POST",
            url: '/signup/checkUser',
            data: {
                "firstname": $scope.firstname,
                "lastname": $scope.lastname,
                "email": $scope.email,
                "password": $scope.password,
                "customerid": $scope.customerid,
                "address": $scope.address,
                "phonenumber": $scope.phonenumber,
                "address": $scope.address,
                "state": $scope.state,
                "ccnumber": $scope.ccnumber,
                "zipcode": $scope.zipcode
            }
        }).success(function (data) {
            if (data.statusCode == "userCreated") {
                $scope.showSignupForm = true;
                $scope.showSignupSuccess = false;
                // window.location.assign("/success");
            }
            else if (data.statusCode == "userExists") {
                $scope.existingUserName = false;
            }
        }).error(function (error) {
            $scope.unexpected_error = false;
        });
    };
    $scope.home = function () {
        window.location.assign('/home');
    }
});