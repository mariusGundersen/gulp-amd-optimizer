'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('./index');
var path = require('path');
var fs = require('fs');


function configInputOutputDone(config, input, output, done){
  
  var stream = amdOptimize(config);
  
  stream.on('data', function(file){
    
    var expected = output.shift();
    
    assert.equal(file.path, expected.path);
    assert.equal(file.contents.toString(), expected.contents);
  });
  
  stream.on('end', done);
  
  
  input.forEach(function(file){
    stream.write(new gutil.File({
      path: file.path,
      contents: new Buffer(file.contents)
    }));
  });
  
  stream.end();
}




it('should emit a named module without dependencies unchanged', function(done){
  
  configInputOutputDone({
    baseUrl: __dirname
  }, [
    {
      path: 'myModule.js',
      contents: 'define("myModule", function(){ return "test"; })'
    }
  ], [
    {
      path: 'myModule',
      contents: 'define("myModule", function(){ return "test"; })'
    }
  ], done);
});


it('should emit a named anonymous modules', function(done){
  
  configInputOutputDone({
    baseUrl: __dirname
  }, [
    {
      path: 'myModule.js',
      contents: 'define(function(){ return "test"; })'
    }
  ], [
    {
      path: 'myModule',
      contents: 'define("myModule", function(){ return "test"; })'
    }
  ], done);
});

it('should emit a dependency', function(done){
  
  configInputOutputDone({
    baseUrl: __dirname
  }, [
    {
      path: 'myModule.js',
      contents: 'define(["deps/dep1"], function(){ return "test"; })'
    }
  ], [
    {
      path: 'deps/dep1',
      contents: 'define("deps/dep1", function(){return "dependency1";});'
    },
    {
      path: 'myModule',
      contents: 'define("myModule", ["deps/dep1"], function(){ return "test"; })'
    }
  ], done);
});

it('should emit one file per module', function(done){
  
  configInputOutputDone({
    baseUrl: __dirname
  }, [
    {
      path: 'myModule.js',
      contents: 'define(["dep1"], function(){ return "test"; }); define("dep1", function(){return "dependency1";});'
    }
  ], [
    {
      path: 'dep1',
      contents: 'define("dep1", function(){return "dependency1";});'
    },
    {
      path: 'myModule',
      contents: 'define("myModule", ["dep1"], function(){ return "test"; })'
    }
  ], done);
});