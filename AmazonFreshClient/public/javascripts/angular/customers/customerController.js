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
    }).when('/orderHistory', {
        templateUrl: '../view/customerViews/orderHistory.ejs',
        controller: 'OrderHistoryController'
    }).when('/checkoutPage', {
        templateUrl: '../view/customerViews/checkoutPage.ejs'
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
        $http.get('api/getSearchResults', {params:{data:category}}).then(function (result) {
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
        $http.get('api/getSearchResults', {params:{data:$scope.searchItem}}).then(function (result) {
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
        $http.get('api/getSearchResults', {params:{data:category}}).then(function (result) {
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
    $scope.showCheckoutBtn = false;
    $scope.showOrderPlaced = false;

    $http.get('api/getCart').then(function (result) {
        //console.log(JSON.stringify(result));
        $scope.cartItems = result.data.cartItems;
        $scope.cartTotal = result.data.cartTotal;
        $scope.cartid = result.data.cartid;
        $scope.showCheckoutBtn = true;
        
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
            location.reload();
        });
    };


    $scope.checkout = function (){
        $scope.showCheckoutBtn = false;
        $scope.showOrderPlaced = true;
    };

/** Datepicker for deliverydate starts**/
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
/** Datepicker for deliverydate ends**/

    $scope.generateBill = function (cartItems){
        console.log("inside deliveryDate : "+$scope.dt);
        $http.post('/api/checkout',
            {
                "cartItems" : cartItems,
                "deliveryDate" : $scope.dt,
                "cartTotal" : $scope.cartTotal,
                "cartid" : $scope.cartid
            }).then(function (data) {
            $location.path('/checkoutPage');
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
    };

    $scope.reviewFarmer = function (farmerName, farmerid) {
        //alert("in review farmer");
        fname = farmerName;
        fid = farmerid;
        $location.path('/reviewFarmer');
    }
}]);

customerApp.controller("OrderHistoryController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $http.get('api/getOrderHistory/').then(function (result) {
        $scope.orderDetails = result.data;
    });

}]);
