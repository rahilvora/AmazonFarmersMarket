var customerApp = angular.module("customerApp", ["ngRoute", "ui.bootstrap"]);

var prodid = 0;
var searchRes = null;
var farmerName = null;
var fid = null;

/** Routes for customer pages**/
customerApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../view/customerViews/homeDashboard.ejs',
        controller: 'CustomerHomeController'
    }).when('/editProfile', {
        templateUrl: '../view/customerViews/editCustomerProfile.ejs',
        controller: 'CustomerProfileController'
    }).when('/searchResults', {
        templateUrl: '../view/customerViews/searchResults.ejs',
        controller: 'searchController'
    }).when('/cartDetails', {
        templateUrl: '../view/customerViews/cartDetailsPage.ejs',
        controller: 'CustomerCartController'
    }).when('/getProductInfo/:prodid', {
        templateUrl: '../view/customerViews/productInfo.ejs',
        controller: 'CustomerViewProductController'
    }).when('/reviewFarmer', {
        templateUrl: '../view/customerViews/reviewFarmer.ejs',
        controller: 'FarmerReviewController'
    })
}]);

customerApp.controller("searchController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.searchResults = searchRes;
    $scope.viewby = 8;
    $scope.totalItems = searchRes.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;

    console.log("Inside searchController");
    $scope.getProductInfo = function (productid) {
        //alert(productid);
        prodid = productid;
        $location.path('/getProductInfo/' + productid);
    }
}]);

customerApp.controller("FarmerReviewController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    //alert("reviewing farmer" + fid);
    $http.get('api/getFarmerReviews', {params: {farmerid: fid}}).then(function (result) {
        console.log(result.data);
        $scope.farmername = result.data.farmername;
        $scope.farmerReviews = result.data.reviews;
        //$location.path('/');
    });

    $scope.addFarmerReview = function (rstars, rbody, rauthor) {
        //alert("In Add Product Review" + prodid);
        //prodid = productid;
        rstars = rstars;
        rbody = rbody;
        rauthor = rauthor;
        console.log(rstars + rbody + rauthor);
        $http.post('api/addFarmerReview', {
            params: {
                farmerid: fid,
                rstars: rstars,
                rbody: rbody,
                rname: rauthor
            }
        }).then(function (result) {
            if (result.data != "Failure") {
                //alert("Review added successfully");
                document.getElementById("farmerReviewForm").reset();
                $http.get('api/getFarmerReviews', {params: {farmerid: fid}}).then(function (result) {
                    console.log(result.data);
                    $scope.farmername = result.data.farmername;
                    $scope.farmerReviews = result.data.reviews;
                    //$location.path('/');
                });
            }
            else {
                alert("Error loading page");
                $location.path('/customerHome');
            }
        });
    }
}]);


/*** Controller for ParentController***/
customerApp.controller("ParentController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    console.log("inside ParentController");
    // console.log("search item "+$scope.searchItem);

    //To fetch the categories and display on LHS
    $http.get('api/getHomeCategories').then(function (result) {
        console.log(result.data);
        $scope.categories = result.data;
        //$location.path('/');
    });


    $scope.searchByCategory = function (category) {
        console.log("inside searchByCategory " + category);
/*
        $scope.searchResults = searchRes;
        $scope.viewby = 8;
        $scope.totalItems = searchRes.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
*/
        $http.post('api/getSearchResults',
         {
         "searchItem" : category
         }).then(function (result) {
         //$scope.searchResults = result.data;

            var data = result.data;
            $scope.searchResults = data;

            //For pagiation to work
            $scope.viewby = 8;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;

         $location.path('/searchResults');
         });
    };

    $scope.search = function () {
        console.log("inside search " + $scope.searchItem);
        $http.post('api/getSearchResults',
            {
                "searchItem": $scope.searchItem
            }).then(function (result) {
            //$scope.searchResults = result.data;

            //For Pagination to Work
            var data = result.data;
            $scope.searchResults = data;
            $scope.viewby = 8;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            searchRes=data;

            $location.path('/searchResults');
        });
    };


    $scope.addToCart = function (product) {
        // console.log("Adding product : "+product+" to cart");
        console.log(JSON.stringify(product));
        $http.post('api/addProductToCart',
            {
                "product": product
            }).then(function (data) {
            $location.path('/');
        });
    };

}]);

/** Controllers for customerprofile page**/
customerApp.controller("CustomerProfileController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $http.get('api/getCustomerDetails').then(function (result) {
        //  console.log(result.data);
        $scope.customerDetails = result.data;
        //$location.path('/products');
    });


    $scope.updateProfile = function () {
        console.log("Firstname : " + $scope.customerDetails.city);
        $http.put('api/updateUserProfile',
            {
                "firstname": $scope.customerDetails.firstname,
                "lastname": $scope.customerDetails.lastname,
                "email": $scope.customerDetails.email,
                "password": $scope.customerDetails.password,
                "customerid": $scope.customerDetails.customerid,
                "address": $scope.customerDetails.address,
                "phonenumber": $scope.customerDetails.phonenumber,
                "state": $scope.customerDetails.state,
                "ccnumber": $scope.customerDetails.ccnumber,
                "zipcode": $scope.customerDetails.zipcode,
                "city": $scope.customerDetails.city
            }).then(function (data) {
            $location.path('/customerHome');
        });
    };
}]);


/*** Controller for CustomerHomePage***/
customerApp.controller("CustomerHomeController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    console.log("inside CustomerHomeController");

    $http.get('api/getHomeCategories').then(function (result) {
        console.log(result.data);
        $scope.categories = result.data;
        //$location.path('/');
    });

    $scope.searchByCategory = function (category) {
        console.log("inside searchByCategory " + category);
        $http.post('api/getSearchResults',
            {
                "searchItem": category
            }).then(function (result) {
            //$scope.searchResults = result.data;
            console.log(JSON.stringify(result));

            var data = result.data;
            searchRes = data;
            /* $scope.searchResults = data;*/
            $scope.viewby = 8;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;

            $location.path('/searchResults');
        });
    };

    $http.get('api/getHomeDashboard').then(function (result) {

        //console.log(JSON.stringify(result));
        $scope.farmerProducts = result.data;
        var data = result.data;
        $scope.farmerProducts = data;

        //For pagiation to work
        $scope.viewby = 8;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;

        //$location.path('/');

    });

    $scope.addToCart = function (product) {
        // console.log("Adding product : "+product+" to cart");
        console.log(JSON.stringify(product));
        $http.post('api/addProductToCart',
            {
                "product": product
            }).then(function (data) {
            $location.path('/');
        });
    };

    $scope.getProductInfo = function (productid) {
        //alert(productid);
        prodid = productid;
        $location.path('/getProductInfo/' + productid);
    }
}]);

/*** Controller for CustomerCartPage***/
customerApp.controller("CustomerCartController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    console.log("inside CustomerCartController");


    $http.get('api/getCart').then(function (result) {
        //console.log(JSON.stringify(result));
        $scope.cartItems = result.data.cartItems;
        $scope.cartTotal = result.data.cartTotal;
        //window.location.assign("/cartDetails");

    });

    $scope.deleteProduct = function (productid, index) {
        console.log("inside deleteProduct : " + productid);
        //console.log("inside deleteProduct : "+index);
        $http.post('api/deleteProductFromCart',
            {
                "productid": productid,
                "index": index
            }).then(function (data) {
            //alert("reloading");
            window.location.assign("api/cartDetails");
        });
    };


    $scope.checkout = function (cartItems) {
        console.log("inside checkout : " + JSON.stringify($scope.cartItems));
        $http.post('api/checkout',
            {
                "cartItems": cartItems
            }).then(function (data) {
            $location.path('/customerHome');
        });
    };
}]);


customerApp.controller("CustomerViewProductController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $http.get('api/getProductInfo/', {params: {productid: prodid}}).then(function (result) {
        //console.log("Farmer main");
        console.log(JSON.stringify(result));
        //alert("in here");
        if (result.data != "Failure") {
            //alert(result);
            $scope.productname = result.data.productname;
            $scope.productprice = result.data.productprice;
            $scope.description = result.data.description;
            $scope.productreviews = result.data.productreviews;
            $scope.farmerName = result.data.farmername;
            $scope.farmerid = result.data.farmerid;
        }
        else {
            alert("Error loading productInfo page");
            $location.path('/allProducts');
        }
    });

    $scope.addProductReview = function (rstars, rbody, rauthor) {
        //alert("In Add Product Review" + prodid);
        //prodid = productid;
        rstars = rstars;
        rbody = rbody;
        rauthor = rauthor;
        console.log(rstars + rbody + rauthor);
        $http.post('api/addProductReview', {
            params: {
                productid: prodid,
                rstars: rstars,
                rbody: rbody,
                rauthor: rauthor
            }
        }).then(function (result) {
            if (result.data != "Failure") {
                //alert("Review added successfully");
                document.getElementById("productReviewForm").reset();
                $http.get('api/getProductInfo/', {params: {productid: prodid}}).then(function (result) {
                    //console.log("Farmer main");
                    //console.log(JSON.stringify(result));
                    if (result.data != "Failure") {
                        //alert(result);
                        $scope.productname = result.data.productname;
                        $scope.productprice = result.data.productprice;
                        $scope.description = result.data.description;
                        $scope.productreviews = result.data.productreviews;
                        $scope.farmerName = result.data.farmername;
                    }
                    else {
                        alert("Error loading productInfo page");
                        $location.path('/allProducts');
                    }
                });

            }
            else {
                alert("Error loading productInfo page");
                $location.path('/allProducts');
            }
        });
    }

    $scope.reviewFarmer = function (farmerName, farmerid) {
        //alert("in review farmer");
        fname = farmerName;
        fid = farmerid;
        $location.path('/reviewFarmer');
    }
}]);
