'use strict';
var optimize = require('../amd-optimize');
var gutil = require('gulp-util');
var through = require('through');
var fs = require('fs');

var File = gutil.File;
var Buffer = require('buffer').Buffer;
var PluginError = gutil.PluginError;

function loadFile(path, name){
  return {
    name: name,
    path: path,
    source: fs.readFileSync(path)
  };
}










module.exports = function (config) {
  
  if(config == undefined || 'baseUrl' in config == false){
    throw new PluginError('gulp-amd-optimize', 'baseUrl is required in the config');
  }
  
  
  var optimizer = optimize(config);

  optimizer.on('dependency', function(dependency){
    optimizer.addFile(loadFile(dependency.url, dependency.name))
  });
  
  function onData(file) {
    if (file.isNull()) {
      this.push(file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-amd-optimize', 'Streaming not supported'));
      return
    }
        
    optimizer.addFile({
      source: file.contents.toString(),
      path: file.path
    });
    
  }
  
  function onEnd(){
    
    var output = optimizer.optimize();
        
    output.forEach(function(module){
      this.queue(new File({
        cwd: config.baseUrl,
        base: 'something',
        path: module.name,
        contents: new Buffer(module.code)
      }));
    }.bind(this));
    
    this.queue(null);
        
  }
  
  return through(onData, onEnd);
};