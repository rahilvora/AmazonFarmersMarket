/**
 * Created by rahilvora on 20/04/16.
 */
var adminApp = angular.module("AdminApp",["ngRoute"]);

//Controllers

adminApp.controller("FarmerController", ["$scope", "$http", "$location", function($scope, $http, $location){
    $scope.farmersAvailable = [];
    $scope.farmers = [];
    //Get Requests
    $http.get('api/getFarmers').then(function(result){
        console.log(result.data);
        $scope.farmersAvailable = result.data;
        //$location.path('/farmers');
    });

    $http.get('api/getAddFarmerRequests').then(function(result){
        console.log(result.data);
        $scope.farmers = result.data;
        //$location.path('/farmers/new');
    });

    //Post Requests
    $scope.addFarmer = function(){
        $http.put('api/addFarmer').then(function(data){
            $location.path('/farmers');
        })
    }

}]);

adminApp.controller("ProductController",["$scope","$http","$location",function($scope,$http,$location){
    $scope.productsAvailable = [];
    $scope.products = [];

    //Get Requests
    $http.get('api/getProducts').then(function(result){
        console.log(result.data);
        $scope.productsAvailable = result.data;
        //$location.path('/products');
    });

    $http.get('api/getAddProductRequests').then(function(result){
        console.log(result.data);
        $scope.products = result.data;;
        //$location.path('/products/new');
    });
    //Post Request
    $scope.addProduct = function(){
        $http.put('api/addProduct').then(function(result){
            $location.path('/products');
        });
    }
}]);

adminApp.controller("DriverController",["$scope","$http","$location",function($scope,$http,$location){
    $scope.driver = [];

    //Get Requests
    $http.get('api/getDrivers').then(function(result){
        console.log(result.data);
        $scope.driver = result.data;;
        //$location.path('/driver');
    });

    //Post Request
    $scope.addDriver = function(){
        $http.put('api/addDriver').then(function(result){
            $location.path('/driver');
        });
    }
}]);

adminApp.controller("CustomerController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.customersAvailable = [];
    $scope.customers = [];

    //Get Requests
    $http.get('api/getCustomers').then(function(result){
        console.log(result.data);
        $scope.customersAvailable = result.data;
        //$location.path('/customers');
    });

    $http.get('api/getAddCustomerRequests').then(function(result){
        console.log(result.data);
        $scope.customers = result.data;
        //$location.path('/customers/new');
    });
    //Post Requests
    $scope.addCustomer = function(){
        $http.put('api/addCustomer').then(function(result){
            $location.path('/customers');
        });
    }
}]);

adminApp.controller("BillController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.bills = [];

    //Get Request
    $http.get('api/getBills').then(function(result){
        console.log(result.data);
        $scope.bills = result.data;
        //$location.path('/bills');
    });
}]);

adminApp.controller("TripController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.trips = [];
    //Get Request
    $http.get('api/getTrips').then(function(result){
        console.log(result.data);
        $scope.trips = result.data;
        //$location.path('/trips');
    })
}]);

//Routes

adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/farmers',{
                templateUrl: '../view/adminViews/farmer/ListFarmers.ejs',
                controller : 'FarmerController'
            }).
            when('/farmer/new',{
                templateUrl: '../view/adminViews/farmer/AddFarmerRequest.ejs',
                controller: 'FarmerController'
            }).
            when('/products',{
                templateUrl: '../view/adminViews/product/ListProducts.ejs',
                controller: 'ProductController'
            }).
            when('/products/new',{
                templateUrl: '../view/adminViews/product/AddProductRequest.ejs',
                controller: 'ProductController'
            }).
            when('/customers',{
                templateUrl: '../view/adminViews/customer/ListCustomers.ejs',
                controller: 'CustomerController'
            }).
            when('/customers/new',{
                templateUrl: '../view/adminViews/customer/AddCustomerRequest.ejs',
                controller: 'CustomerController'
            }).
            when('/bills',{
                templateUrl: '../view/adminViews/bill/ListBills.ejs',
                controller: 'BillController'
            }).
            when('/trips',{
                templateUrl: '../view/adminViews/trip/ListTrips.ejs',
                controller: 'TripController'
            }).
            when('/driver',{
                templateUrl: '../view/adminViews/driver/ListDrivers.ejs',
                controller: 'DriverController'
            }).
            when('/driver/new',{
                templateUrl: '../view/adminViews/driver/AddDriver.ejs',
                controller: 'DriverController'
            }).
            otherwise({
                redirectTo: "/"
            })
}]);