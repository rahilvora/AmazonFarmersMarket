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

    //Put Requests

    $scope.addFarmer = function(p_farmerid){
        $http.put('api/addFarmer',{farmerid:p_farmerid}).then(function(data){
            $location.path('/farmers');
        })
    };

    //Delete Request

    $scope.deleteFarmer = function(p_farmerid){
        $http.delete('api/deleteFarmer',{params: {data:p_farmerid}}).then(function(data){
            $location.path('/farmers');
        })
    };

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
        $scope.products = result.data;
        //$location.path('/products/new');
    });

    //Put Request

    $scope.addProduct = function(p_productid){
        $http.put('api/addProduct',{productid:p_productid}).then(function(result){
            $location.path('/products');
        });
    }

    //Delete Request

    $scope.deleteProduct = function(p_productid){
        $http.delete('api/deleteProduct',{params: {data:p_productid}}).then(function(result){
            $location.path('/products');
        });
    }
}]);

adminApp.controller("DriverController",["$scope","$http","$location",function($scope,$http,$location){
    $scope.drivers = [];

    //Get Requests

    $http.get('api/getDrivers').then(function(result){
        console.log(result.data);
        $scope.drivers = result.data;
        //$location.path('/driver');
    });

    //Post Request

    $scope.addDriver = function(){
        $http.post('api/addDriver',$scope.form).then(function(result){
            $location.path('/driver');
        });
    };

    //Put Request

    $scope.editDriver = function(){
        $http.put('api/editDriver',$scope.form).then(function(result){
            $location.path('/driver');
        });
    };

    //Delete Request

    $scope.deleteDriver = function(p_driverid){
        $http.delete('api/deleteDriver',{params: {data:p_driverid}}).then(function(result){
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

    //Put Requests

    $scope.addCustomer = function(p_customerid){
        console.log(p_customerid);
        $http.put('api/addCustomer',{customerid:p_customerid}).then(function(result){
            $location.path('/customers');
        });
    };

    //Delete Requests

    $scope.deleteCustomer = function(p_customerid){
        $http.delete('api/deleteCustomer',{params: {data:p_customerid}}).then(function(result){
            $location.path('/customers');
        });
    }
}]);

adminApp.controller("BillController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.bills = [];

    //Get Requests

    $http.get('api/getBills').then(function(result){
        console.log(result.data);
        $scope.bills = result.data;
        //$location.path('/bills');
    });
}]);

adminApp.controller("TripController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.trips = [];

    //Get Requests
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
            when('/farmers/new',{
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