var FarmerApp = angular.module("FarmerApp",["ngRoute"]);


FarmerApp.controller("FarmerProductController", ["$scope", "$http", "$location", function($scope, $http, $location){
    $scope.farmerProducts = [];
    $scope.farmers = [];

    //Get all the farmers products

    $http.get('api/getFarmerProducts').then(function(result){
        console.log("getFarmerProducts "+result.data);
        $scope.farmerProducts = result.data;
        //$location.path('/farmers');
    });

    //form to add a new product
    $http.get('api/createProduct').then(function(result){
        console.log("getFarmerProducts "+result.data);
        $scope.farmerProducts = result.data;
        //$location.path('/farmers');
    });



}]);


FarmerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/allProducts',{
            templateUrl: '../view/farmerViews/farmerProducts.ejs',
            controller : 'FarmerProductController'
        }).
            when('/products/new',{
            templateUrl: '../view/farmerViews/addNewProduct.ejs',
            controller : 'FarmerProductController'
        }).
        otherwise({
            redirectTo: "/"
        })
    }]);