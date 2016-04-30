var FarmerApp = angular.module("FarmerApp",["ngRoute"]);

var editproductid=0;
FarmerApp.controller("FarmerProductController", ["$scope", "$http", "$location", function($scope, $http, $location){
    $scope.farmerProducts = [];
    $scope.farmers = [];

    //Get all the farmers products

    $http.get('api/getFarmerProducts').then(function(result){

        $scope.farmerProducts = result.data;
        //$location.path('/farmers');
    });

    //form to add a new product


    $scope.addProduct= function(){

        $http.post('api/createProduct', $scope.form).then(function(result){
            if(result.data== "Success"){
                alert("Product added");
                document.getElementById("form").reset();
            }
            else{
                alert("Error inserting product. Verify information");
            }

        });
    }

    $scope.getEditProduct= function(productid){

        alert(productid);
        editproductid=productid;
        $location.path('/editProduct');

    }

    $scope.deactivateProduct= function(productid){

           console.log(productid);
       $http.put('api/deactivateProduct',{params : {productid:productid}}).then(function(result){
            
        });

    }

}]);


FarmerApp.controller("FarmerEditProductController", ["$scope", "$http", "$location", function($scope, $http, $location){

    alert("edit ctrl"+editproductid);
    $http.get('api/getEditProduct', {params:{data:editproductid}}).then(function(result){
        alert(JSON.stringify(result));
        if(result.data!="Failure") {

            $scope.form.productid= result.data.productid;
            $scope.form.productname=result.data.productname;
            $scope.form.productprice=result.data.productprice;
            $scope.form.productdescription=result.data.description;
        }
        else{
            alert("Error loading product page");

           // $location.path('/allProducts');
        }

    });

    $scope.updateProduct= function(){
        alert(" in update product");

        $http.post('api/updateProduct', $scope.form).then(function(result){
            if(result.data == "Success")
                alert("product updated");
            $location.path('/allProducts');

        });

    }

    $scope.cancelUpdateProduct= function(){
        alert(" cancelling update");
        $location.path('/allProducts');
    }


}]);



FarmerApp.controller("FarmerProfileController", ["$scope", "$http", "$location", function($scope, $http, $location){

    $scope.myRegex = /[a-zA-Z]{4}[0-9]{6,6}[a-zA-Z0-9]{3}/;
    $("#editProfile").hide();
    $("#viewProfile").show();
    debugger;
    $http.get('api/getFarmerProfile').then(function(result){

        //fetch farmer info
        $scope.farmerid=result.data[0].farmerid;
        $scope.firstname=result.data[0].firstname;
        $scope.lastname=result.data[0].lastname;
        $scope.address=result.data[0].address;
        $scope.city=result.data[0].city;
        $scope.state=result.data[0].state;
        $scope.zipcode=result.data[0].zipcode;
        $scope.phonenumber=result.data[0].phonenumber;
        $scope.email=result.data[0].email;


        $scope.editProfileForm.editFarmerID=result.data[0].farmerid;
        $scope.editProfileForm.editFirstname=result.data[0].firstname;
        $scope.editProfileForm.editLastname=result.data[0].lastname;
        $scope.editProfileForm.editAddress=result.data[0].address;
        $scope.editProfileForm.editCity=result.data[0].city;
        $scope.editProfileForm.editState=result.data[0].state;
        $scope.editProfileForm.editZipcode=result.data[0].zipcode;
        $scope.editProfileForm.editPhonenumber=result.data[0].phonenumber;
        $scope.editProfileForm.editEmail=result.data[0].email;
        $scope.editProfileForm.editPassword=result.data[0].password;


    });

    $scope.updateProfile=function(){

        $("#editProfile").show();
        $("#viewProfile").hide();
    };

    $scope.cancel=function(){
        //document.getElementById("editProfileForm").reset();
        $("#editProfile").hide();
        $("#viewProfile").show();
    }
    $scope.editFarmerProfile= function() {

        alert("here");

        $http.put('api/editFarmerProfile', $scope.editProfileForm).then(function (result) {
            alert("Successfully updated");
           // $("#editProfile").hide();
            //$("#viewProfile").show();
            location.reload();

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
            controller : 'FarmerEditProductController'
        }).
        when('/editFarmerProfile',{
            templateUrl: '../view/farmerViews/editProfile.ejs',
            controller : 'FarmerProfileController'
        }).
        otherwise({
            controller : 'defaultController'
        })
    }]);