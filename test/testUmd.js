'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('../index');
var path = require('path');
var fs = require('fs');


function configInputOutputDone(options, input, output, done){
  
  var stream = amdOptimize({
    baseUrl: __dirname  
  }, options);
  
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




it('should not name umd modules when umd is false', function(done){
  
  configInputOutputDone({
    umd: false
  }, [
    {
      path: 'myModule.js',
      contents: 'define(["deps/umd"], function(){ return "test"; })'
    }
  ], [
    {
      path: 'deps/umd',
      contents: "((function() {})(typeof define === 'function' && define.amd ? define : null));\n\n"
    },
    {
      path: 'myModule',
      contents: 'define("myModule", ["deps/umd"], function(){ return "test"; });\n\n'
    }
  ], done);
});



it('should name umd modules when umd is false', function(done){
  
  configInputOutputDone({
    umd: true
  }, [
    {
      path: 'myModule.js',
      contents: 'define(["deps/umd"], function(){ return "test"; })'
    }
  ], [
    {
      path: 'deps/umd',
      contents: "((function() {})((typeof define === 'function' && define.amd ? define.bind(null, \"deps/umd\") : null)));\n\n"
    },
    {
      path: 'myModule',
      contents: 'define("myModule", ["deps/umd"], function(){ return "test"; });\n\n'
    }
  ], done);
});
