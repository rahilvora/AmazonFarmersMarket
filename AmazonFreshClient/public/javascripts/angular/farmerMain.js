var FarmerApp = angular.module("FarmerApp",["ngRoute"]);

var editproductid=0;
FarmerApp.controller("FarmerProductController", ["$scope", "$http", "$location", function($scope, $http, $location){
    $scope.farmerProducts = [];
    $scope.farmers = [];


    //Get all the farmers products

    $http.get('api/getFarmerProducts').then(function(result){

        console.log(JSON.stringify(result));
        $scope.farmerProducts = result.data;
        //$location.path('/farmers');
    });

    //form to add a new product


    $scope.addProduct= function(){
        console.log($scope.form.price);


        $http.post('api/createProduct', $scope.form).then(function(result){

        });
    }

    $scope.getEditProduct= function(productid){

        alert(productid);
        editproductid=productid;
        $location.path('/editProduct');
      /*  $http.get('api/getEditProduct', {params:{data:productid}}).then(function(result){
            if(result) {

                alert(result.data[0].productname);
                $location.path('/editProduct');

            }

        });*/
    }

   /* $scope.editProduct= function(){


        $http.put('api/editProduct', $scope.form).then(function(result){

        });
    }*/


}]);


FarmerApp.controller("FarmerEditProfileController", ["$scope", "$http", "$location", function($scope, $http, $location){

    $http.get('api/getEditProduct', {params:{data:editproductid}}).then(function(result){
        if(result) {

            alert("in " + result.data[0].productname);

           // $scope.productname.value=result.data[0].productname;
          //  $scope.editproductname=result.data[0].productname;
           $scope.form.productname=result.data[0].productname;
            $scope.form.productprice=result.data[0].productprice;
            $scope.form.productdescription=result.data[0].description;


        }

    })

}]);



FarmerApp.controller("FarmerProfileController", ["$scope", "$http", "$location", function($scope, $http, $location){

    $http.get('api/getFarmerProfile').then(function(result){

        //fetch farmer info

    });

    $scope.editFarmerProfile= function() {


        $http.put('api/editFarmerProfile', $scope.form).then(function (result) {

        });
    };

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
        when('/viewProfile',{
            templateUrl: '../view/farmerViews/viewProfile.ejs',
            controller : 'FarmerProfileController'
        }).
        when('/editProduct',{
            templateUrl: '../view/farmerViews/editProduct.ejs',
            controller : 'FarmerEditProfileController'
        }).
        otherwise({
            controller : 'defaultController'
        })
    }]);