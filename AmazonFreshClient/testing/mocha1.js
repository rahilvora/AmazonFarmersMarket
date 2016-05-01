var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http")
    ,mocha = require("mocha");


describe('http test',function(){

    it('it should make get request to get trips list',function(done){
        http.get('http://localhost:3000/admin#/trips',function(res){
            console.log(res.length);
            assert.equal(200,res.statusCode);
            done();
        });
    });

    it('it should make get request to get customers list',function(done){
        http.get('http://localhost:3000/admin#/customers',function(res){
            assert.equal(200,res.statusCode);
            done();
        });
    });

    it('it should make get request to add new driver',function(done){
        http.get('http://localhost:3000/admin#/driver/new',function(res){
            assert.equal(200,res.statusCode);
            done();
        });
    });

    it('it should make get request to get bills list',function(done){
        http.get('http://localhost:3000/admin#/bills',function(res){
            assert.equal(200,res.statusCode);
            done();
        });
    });

    it('it should make get request to add new farmer',function(done){
        http.get('http://localhost:3000/admin#/farmers/new',function(res){
            assert.equal(200,res.statusCode);
            done();
        });
    });
});