# [gulp](https://github.com/wearefractal/gulp)-amd-optimizer

> Emits the entire dependency tree of one or more AMD modules, from leaves to root, and names anonymous modules

This module does not combine the modules into a single file. It is up to you to decide how to concat/minify the modules, using for example uglify, closure-compiler or just concatenating it together. 

## Install

```bash
$ npm install --save-dev gulp-amd-optimizer
```


## Usage

```js
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat-sourcemap');

var requireConfig = {
  baseUrl: __dirname
};
var options = {
  umd: false
};

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(amdOptimize(requireConfig, options))
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('dist'));
});
```

### Output

gulp-amd-optimizer accepts JS files containing one or more AMD modules. Anonymous modules are given the name of the file (including the path, relative to the baseUrl, without the `.js` extension). Dependencies of modules are found and a full dependency tree is constructed. Finally the tree is sorted in topological order (from leaves to root nodes) and each module is emitted as a single file.

This plugin does not attempt to concat the files. This is the job of other plugins.


### Config

The amdOptimizer method takes the RequireJS configuration as its first argument, as described in the [RequireJS documentation](http://requirejs.org/docs/api.html#config), with some slight differences:

 * `baseUrl`: *string* The path from which modules are loaded. [RequireJS documentation](http://requirejs.org/docs/api.html#config-baseUrl)
 * `exclude`: *[string]* List of modules NOT to load. 

### Options

The second argument to amdOptimizer is optional and can be used to change the way modules are found and named. It consists of the following options:

 * `umd`: *boolean* When true, try to find umd modules and name them. See https://github.com/umdjs/umd

### Sourcemap

gulp-amd-optimzer supports the [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps/) plugin. The example below shows how sourcemaps can be used along with the options 

```js
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat-sourcemap');
var sourcemap = require('gulp-sourcemaps');

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(sourcemap.init())
      .pipe(amdOptimize({
        baseUrl: 'src',
        path:{
          'lib': '../lib'
        }
        exclude: [
          'jQuery'
        ]
      }))
      .pipe(concat('modules.js', {
        sourcesContent: true,
        prefix: 1
      }))
    .pipe(sourcemap.write())
    .pipe(gulp.dest('dist'));
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Marius Gundersen](http://mariusgundersen.net)
