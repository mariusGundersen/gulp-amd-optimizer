'use strict';
var configInputOutputDone = require('./utils/configInputOutputDone');

describe("basic testing", function(){
  
  it('should emit a named module without dependencies unchanged', function(done){

    configInputOutputDone({
    }, [
      {
        path: 'myModule.js',
        contents: 'define("myModule", function(){ return "test"; })'
      }
    ], [
      {
        path: 'myModule',
        contents: 'define("myModule", function(){ return "test"; })\n\n'
      }
    ], done);
  });


  it('should emit a named anonymous modules', function(done){

    configInputOutputDone({
    }, [
      {
        path: 'myModule.js',
        contents: 'define(function(){ return "test"; })'
      }
    ], [
      {
        path: 'myModule',
        contents: 'define("myModule", function(){ return "test"; })\n\n'
      }
    ], done);
  });

  it('should emit a dependency', function(done){

    configInputOutputDone({
    }, [
      {
        path: 'myModule.js',
        contents: 'define(["deps/dep1"], function(){ return "test"; })'
      }
    ], [
      {
        path: 'deps/dep1',
        contents: 'define("deps/dep1", function(){return "dependency1";});\n\n'
      },
      {
        path: 'myModule',
        contents: 'define("myModule", ["deps/dep1"], function(){ return "test"; })\n\n'
      }
    ], done);
  });

  it('should emit one file per module', function(done){

    configInputOutputDone({
    }, [
      {
        path: 'myModule.js',
        contents: 'define("dep1", function(){return "dependency1";}); define(["dep1"], function(){ return "test"; });'
      }
    ], [
      {
        path: 'dep1',
        contents: 'define("dep1", function(){return "dependency1";});\n\n'
      },
      {
        path: 'myModule',
        contents: 'define("myModule", ["dep1"], function(){ return "test"; });\n\n'
      }
    ], done);
  });
});