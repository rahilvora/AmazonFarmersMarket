var customerApp = angular.module('customerApp', ['ngRoute']);


/** Routes for customer pages**/
customerApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '../view/customerViews/homeDashboard.ejs',
            controller: 'CustomerHomeController'
        }).
        when('/editProfile', {
            templateUrl: '../view/customerViews/editCustomerProfile.ejs',
            controller: 'CustomerProfileController'
        }).
        when('/searchResults', {
        templateUrl: '../view/customerViews/searchResults.ejs',
        controller: 'ParentController'
    }).
        when('/cartDetails', {
        templateUrl: '../view/customerViews/cartDetailsPage.ejs',
        controller: 'CustomerCartController'
    })
}]);


/*** Controller for ParentController***/
customerApp.controller("ParentController", ["$scope", "$http", "$location", function($scope, $http, $location){
    console.log("inside ParentController");
   // console.log("search item "+$scope.searchItem);
    $scope.search = function(){
        console.log("inside search "+$scope.searchItem);
        $http.post('/shop/getSearchResults',
            {
                "searchItem" : $scope.searchItem
            }).then(function (result) {
            $scope.searchResults = result.data;
            $location.path('/searchResults');
        });
    };


    $scope.addToCart = function (product){
        // console.log("Adding product : "+product+" to cart");
        console.log(JSON.stringify(product));
        $http.post('/shop/addProductToCart',
            {
                "product" : product
            }).then(function (data) {
            $location.path('/');
        });
    };

}]);



/** Controllers for customerprofile page**/
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


/*** Controller for CustomerHomePage***/
customerApp.controller("CustomerHomeController", ["$scope", "$http", "$location", function($scope, $http, $location){
    console.log("inside CustomerHomeController");
    $http.get('/shop/getHomeDashboard').then(function(result){

        //console.log(JSON.stringify(result));
        $scope.farmerProducts = result.data;
        $location.path('/');

    });

    $scope.addToCart = function (product){
       // console.log("Adding product : "+product+" to cart");
        console.log(JSON.stringify(product));
        $http.post('/shop/addProductToCart',
            {
                "product" : product
            }).then(function (data) {
            $location.path('/');
        });
    };


}]);

/*** Controller for CustomerCartPage***/
customerApp.controller("CustomerCartController", ["$scope", "$http", "$location", function($scope, $http, $location){
    console.log("inside CustomerCartController");


    $http.get('/shop/getCart').then(function(result){
        console.log(JSON.stringify(result));
        $scope.cartItems = result.data.cartItems;
        $scope.cartTotal = result.data.cartTotal;
        $location.path('/cartDetails');

    });

    $scope.checkout = function (cartItems){
        console.log("inside checkout : "+$scope.cartItems);
       /* $http.post('/shop/checkout',
            {
                "firstname" : $scope.customerDetails.firstname,
            }).then(function (data) {
            $location.path('/customerHome');
        });*/
    };


}]);