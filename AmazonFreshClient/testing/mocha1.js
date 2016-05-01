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
});