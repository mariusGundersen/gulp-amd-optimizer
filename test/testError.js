'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('../index');

describe("error testing", function(){
  
  it('should emit a named module without dependencies unchanged', function(done){
    
    var stream = amdOptimize({
      baseUrl: __dirname+'/..'
    });
    
    
    stream.on('error', function(error){
      console.log(error);
      assert.ok(true);
      done();
    });

    stream.write(new gutil.File({
      path: 'myModule.js',
      contents: new Buffer('define(["deps/not-existing"], function(){ return "test"; })')
    }));

    stream.end();
  });
});