'use strict';
var amdOptimize = require('amdOptimize');
var gutil = require('gulp-util');
var through = require('through2');



module.exports = function (config) {
  
  
  
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-amd-optimize', 'Streaming not supported'));
      return cb();
    }
    
    
    this.push(file);
    cb();
  });
};