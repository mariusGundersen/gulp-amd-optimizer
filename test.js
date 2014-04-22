'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('./index');
var path = require('path');

it('should emit a named module without dependencies unchanged', function(done){
  
  var stream = amdOptimize({
    baseUrl: __dirname
  });
  
  stream.on('data', function(file){
    assert.equal(file.path, 'myModule');
    assert.equal(file.contents.toString(), 'define("myModule", function(){ return "test"; })');
    done();
  });
  
  stream.write(new gutil.File({
    path: 'myModule.js',
    contents: new Buffer('define("myModule", function(){ return "test"; })')
  }));
  
  stream.end();
});