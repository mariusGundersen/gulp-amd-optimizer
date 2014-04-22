# [gulp](https://github.com/wearefractal/gulp)-amd-optimize 

> Emits the entire dependency tree of one or more AMD modules, from leaves to root, and names anonymous modules

This module does not combine the modules into a single file. It is up to you to decide how to concat/minify the modules, using for example uglify, closure-compiler or just concatenating it together. 

## Install

```bash
$ npm install --save-dev gulp-amd-optimize
```


## Usage

```js
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimize');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('src/*.css')
    .pipe(amdOptimize())
    .pipe(concat())
    .pipe(gulp.dest('dist'));
});
```

### Output

gulp-amd-optimize accepts JS files containing one or more AMD modules. Anonymous modules are given the name of the file (including the path, relative to the baseUrl, without the `.js` extension). Dependencies of modules are found and a full dependency tree is constructed. Finally the tree is sorted in topological order (from leaves to root nodes) and each module is emitted as a single file.

This plugin does not attempt to concat the files. This is the job of other plugins.


### Options

The method takes the requireJS config file as its first argument. Use this to supply the baseUrl, path and other requireJS configurations

```js
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimize');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('src/*.css')
    .pipe(amdOptimize({
      baseUrl: __dirname,
      path: {
        'jQuery': 'bower_components/jQuery/jQuery'
      }
    }))
    .pipe(concat())
    .pipe(gulp.dest('dist'));
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Marius Gundersen](http://mariusgundersen.net)
