/**
 * Created by rahilvora on 20/04/16.
 */
var adminApp = angular.module("AdminApp",["ngRoute","ui.bootstrap","ngFileUpload"]);
var trucks = [];
var drivers = [];
var trips = [];
//Controllers

adminApp.controller("FarmerController", ["$scope", "$http", "$location", function($scope, $http, $location){
    $scope.farmersAvailable = [];
    $scope.farmers = [];

    //Get Requests

    $http.get('api/getFarmers').then(function(result){
        var data = result.data;
        $scope.farmersAvailable = data;
        $scope.viewby = 10;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
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
        var data = result.data;
        $scope.productsAvailable = result.data;
        $scope.viewby = 10;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        //$location.path('/products');
    });

    $http.get('api/getAddProductRequests').then(function(result){
        console.log(result.data);
        $scope.products = result.data;
       // $location.path('/products/new');
    });

    //Put Request

    $scope.addProduct = function(p_productid){
        $http.put('api/addProduct',{productid:p_productid}).then(function(result){
            location.reload();
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
    $scope.refresh = function() {
        $http.get('api/getDrivers').then(function (result) {
            var data = result.data;
            $scope.drivers = data;
            $scope.viewby = 10;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            //$location.path('/driver');
        });
    }
    $scope.refresh();
    //Post Request

    $scope.addDriver = function(){
        $http.post('api/addDriver',$scope.form).then(function(result){
            $scope.refresh();
            $location.path('/driver');
        });
    };

    $scope.editDriver = function(p_driverid){
        $http.get('api/editDriver',{params: {data:p_driverid}},{ cache: true}).then(function(result){
            drivers = result.data;
            $location.path('/driver/edit');
        });
    };

    //Put Request

    $scope.updateDriver = function(){
        debugger;
        try{
            $scope.form.CurrentDriverId = drivers[0].driverid;
            $http.put('api/updateDriver',$scope.form).then(function(result){
                $scope.refresh();
                $location.path('/driver');
            });
        }
        catch(e){
            console.log("driver is not defined")
            $location.path('/driver');
        }
    };
    //Delete Request

    $scope.deleteDriver = function(p_driverid){
        $http.delete('api/deleteDriver',{params: {data:p_driverid}}).then(function(result){
            $scope.refresh();
            $location.path('/driver');
        });
    }

}]);

adminApp.controller("TruckController",["$scope","$http","$location",function($scope,$http,$location){
    $scope.trucks = [];
    $scope.truck = [];
    $scope.drivers = [];
    //Get Requests

    $scope.refresh = function(){

        var data1;
        var data2;
        $http.get('api/getDrivers').then(function (result) {
            var data1 = result.data;
            $scope.drivers = data1;
            //$scope.viewby = 10;
            //$scope.totalItems = data1.length;
            //$scope.currentPage = 1;
            //$scope.itemsPerPage = $scope.viewby;
        });

        $http.get('api/getTrucks').then(function(result){
            var data = result.data;
            $scope.trucks = data;
            $scope.viewby = 10;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
        });
    };
    $scope.refresh();

    //Post Request

    $scope.addTruck = function(){
        $scope.form.driverid = $scope.selectedValue;
        $http.post('api/addTruck',$scope.form).then(function(result){
            $scope.refresh();
            $location.path('/trucks');
        });
    };

    //Put Request

    $scope.editTruck = function(p_truckid){
        $http.get('api/editTruck',{params: {data:p_truckid}}).then(function(result){
            trucks  = $scope.truck = result.data;
            $location.path('/truck/edit');
        });
    };

    $scope.updateTruck = function(){
        $scope.form.driverid = $scope.selectedValue.split(" ")[0];
        $scope.form.CurrentTruckId = trucks[0].truckid;
        $http.put('api/updateTruck',$scope.form).then(function(result){
            $location.path('/trucks');
        });
    };

    //Delete Request

    $scope.deleteTruck = function(p_truckid){
        $http.delete('api/deleteTruck',{params: {data:p_truckid}}).then(function(result){
            $scope.refresh();
            $location.path('/trucks');
        });
    }

}]);

adminApp.controller("CustomerController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.customersAvailable = [];
    $scope.customers = [];

    //Get Requests

    $http.get('api/getCustomers').then(function(result){
        var data = result.data;
        console.log("Total Customers: " + data.length);
        $scope.customersAvailable = data;

        $scope.viewby = 10;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;

        //$scope.setPage = function (pageNo) {
        //    $scope.currentPage = pageNo;
        //};
        //
        //$scope.pageChanged = function() {
        //    console.log('Page changed to: ' + $scope.currentPage);
        //};
        //
        //$scope.setItemsPerPage = function(num) {
        //    $scope.itemsPerPage = num;
        //    $scope.currentPage = 1; //reset to first paghe
        //}
    });

    $http.get('api/getAddCustomerRequests').then(function(result){
        var data = result.data;
        console.log("Total Customer Requests are: " + result.data.length);
        $scope.customers = data;

        $scope.view = 10;
        $scope.ti = data.length;
        $scope.currPage = 1;
        $scope.itemsPP = $scope.view;
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

    //test

}]);

adminApp.controller("testController",["$scope",function($scope){
    $scope.totalItems = 128;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}]);

adminApp.controller("BillController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.bills = [];

    //Get Requests

    $http.get('api/getBills',{ cache: true}).then(function(result){
        var data = result.data;
        console.log(result.data);
        $scope.bills = data;
        $scope.viewby = 10;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        //$location.path('/bills');
    });
}]);

adminApp.controller("TripController", ["$scope", "$http", "$location", "$window", function($scope,$http,$location,$window){
    $scope.trips = [];

    //Get Requests
    $http.get('api/getTrips',{ cache: true}).then(function (result) {
            var data = result.data;
            console.log("data is ::" + data);
            $scope.trips = data;
            $scope.viewby = 10;
            $scope.totalItems = data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $location.path('/trips');
        });    


    $scope.showmap = function(p_tripid){
        /**
        $http.get('api/showmap',{params: {data:p_tripid}},{ cache: true}).then(function(result){
            var data = result.data
            $scope.data = data;
            console.log("data for map is ::" + JSON.stringify(data));
            $location.path('/trips/showmap');
        });
        **/
            $window.location.href = 'http://localhost:3000/api/showmap?tripid=' + p_tripid;
        
    };
}]);

adminApp.controller("StatisticTotalDeliveryController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.trips = [];

    //Get Requests
    $http.get('api/totalDelivery').then(function(result){
        $scope.totaldelivery = result.data;

        var data = result.data;
        var MA = [];
        for(var a in data){
            var t = [];
            t.push(data[a].dropoffzip);
            t.push(data[a].total);
            MA.push(t);
        }
        console.log(MA)
        generateChart(MA);
    });
}]);

adminApp.controller("StatisticRevenueController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.trips = [];

    //Get Requests
    $http.get('api/revenuePerDay').then(function(result){
        $scope.revenuePerDay = result.data;
        var data = result.data;
        var mainArray = [];
        for(var a in data){
            var temp = [];
            temp.push(data[a].dropoffzip);
            temp.push(data[a].revenuePerDay);
            mainArray.push(temp);
        }
        console.log(mainArray)
        generateChart(mainArray);
    });
}]);

adminApp.controller("StatisticController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.data = [];

    //Get Requests
    $http.get('api/getTrips',{ cache: true}).then(function(result){
        //$location.path('/trips');
    });

    $scope.addData = function(){
        $http.get('api/getRevenue',{params:{data:$scope.date}},{ cache: true}).then(function(result){

            $scope.data = result.data;
            var x = $scope.data[0].total;
            callCharts(x);
            //$location.path('/trips');
        });
    }

    $scope.getTrips = function(){
        console.log($scope.location);
        $http.get('api/getTrips',{params:{data:$scope.location}},{cache:true}).then(function(result){
            $scope.trips = result.data;
        });
    }


}]);

adminApp.controller("StatisticChordController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.trips = [];

    //Get Requests
    $http.get('api/pick-dropLocation',{ cache: true}).then(function(result){
        console.log(result.data);
        $scope.trips = result.data;
        createJSON($scope.trips);
        //$location.path('/trips');
    });
}]);


adminApp.controller("StatisticRidesPerDriverController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $scope.rides = [];

    //Get Requests
    $http.get('api/ridesPerDriver',{ cache: true}).then(function(result){
        debugger;
        var data = result.data;
        var total = 0;
        for(var a in data){
            total += data[a].trips;
        }
        $scope.rides = data;
        createJSON($scope.rides,total);
    });
}]);

adminApp.controller("upload", ["$scope", "$http", "$location","Upload", function($scope,$http,$location,Upload){
    console.log("Upload Controller");
    $scope.upload = function(){
        debugger;
        console.log($scope.file);
        Upload.upload({
            url:'api/upload',
            data:{file:$scope.file}
        }).then(function(result){
            console.log("Success");
        });
        //console.log(file);
    }
}]);

adminApp.controller("fakeDataController", ["$scope", "$http", "$location", function($scope,$http,$location){
    $http.get('api/generateData').then(function(result){
        console.log("Success");
    });
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
        when('/customers/test',{
            templateUrl: '../view/adminViews/customer/test.ejs',
            controller: 'testController'
        }).
        when('/bills',{
            templateUrl: '../view/adminViews/bill/ListBills.ejs',
            controller: 'BillController'
        }).
        when('/trips',{
                templateUrl: '../view/adminViews/trip/ListTrips.ejs',
                controller: 'TripController'
            }).
        when('/trips/showmap',{
                templateUrl: '../view/adminViews/trip/map.ejs',
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
        when('/driver/edit',{
            templateUrl: '../view/adminViews/driver/EditDriver.ejs',
            controller: 'DriverController'
        }).
        when('/trucks',{
            templateUrl: '../view/adminViews/truck/ListTrucks.ejs',
            controller: 'TruckController'
        }).
        when('/truck/new',{
            templateUrl: '../view/adminViews/truck/AddTruck.ejs',
            controller: 'TruckController'
        }).
        when('/truck/edit',{
            templateUrl: '../view/adminViews/truck/EditTruck.ejs',
            controller: 'TruckController'
        }).
        when('/statistic/revenue',{
            templateUrl: '../view/adminViews/statistic/revenue.ejs',
            controller: 'StatisticController'
        }).
        when('/statistic/delivery',{
            templateUrl: '../view/adminViews/statistic/delivery.ejs',
            controller: 'StatisticController'
        }).
        when('/statistic/ridesPerArea',{
            templateUrl: '../view/adminViews/statistic/test.ejs',
            controller: 'StatisticChordController'
        }).
        when('/statistic/ridesPerDriver',{
            templateUrl: '../view/adminViews/statistic/ridesPerDriver.ejs',
            controller: 'StatisticRidesPerDriverController'
        }).
        when('/statistic/RevenuePerDay-Area Wise',{
            templateUrl: '../view/adminViews/statistic/RevenuePerDay.ejs',
            controller: 'StatisticRevenueController'
        }).
        when('/statistic/TotalDelivery-Area Wise',{
            templateUrl: '../view/adminViews/statistic/TotalDelivery.ejs',
            controller: 'StatisticTotalDeliveryController'
        }).
        when('/upload',{
            templateUrl: '../view/adminViews/upload.ejs',
            controller: 'upload'
        }).
        when('/fake/product',{
            templateUrl: '../view/adminViews/generatedata.ejs',
            controller: 'fakeDataController'
        }).
        otherwise({
            redirectTo: "/"
        })
    }]);