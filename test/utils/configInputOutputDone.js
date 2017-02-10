var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('../../index');
var path = require('path');
var fs = require('fs');

module.exports = function configInputOutputDone(options, input, output, done){

  var stream = amdOptimize({
    baseUrl: path.join(__dirname, '..')
  }, options);

  stream.on('data', function(file){

    var expected = output.shift();
    assert.equal(file.name, expected.path);
    assert.equal(file.contents.toString(), expected.contents);
  });

  stream.on('end', done);

  stream.on('error', function(error){
    done(error);
  });

  input.forEach(function(file){
    stream.write(new gutil.File({
      path: path.join(__dirname, '../deps', file.path),
      base: path.join(__dirname, '../deps'),
      contents: new Buffer(file.contents)
    }));
  });

  stream.end();
};