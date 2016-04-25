var customerApp = angular.module('customerApp', ['ngRoute']);


/** Routes for customer pages**/
customerApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/editProfile', {
            templateUrl: '../view/customerViews/editCustomerProfile.ejs',
            controller: 'CustomerProfileController'
        }).
        otherwise({
        redirectTo: "/"
        })
}]);



/** Controllers for customer pages**/
customerApp.controller("CustomerProfileController", ["$scope", "$http", "$location", function($scope, $http, $location){

    $http.get('/shop/getCustomerDetails').then(function(result){
      //  console.log(result.data);
        $scope.customerDetails = result.data;
        //$location.path('/products');
    });


    $scope.updateProfile = function (){
        console.log("Firstname : "+$scope.customerDetails.city);
        $http.put('/shop/updateUserProfile',
            {
                "firstname" : $scope.customerDetails.firstname,
                "lastname" : $scope.customerDetails.lastname,
                "email" : $scope.customerDetails.email,
                "password" : $scope.customerDetails.password,
                "customerid" : $scope.customerDetails.customerid,
                "address" : $scope.customerDetails.address,
                "phonenumber" : $scope.customerDetails.phonenumber,
                "state" : $scope.customerDetails.state,
                "ccnumber" : $scope.customerDetails.ccnumber,
                "zipcode" : $scope.customerDetails.zipcode,
                "city" : $scope.customerDetails.city
            }).then(function (data) {
            $location.path('/customerHome');
        });
    };
        


}]);