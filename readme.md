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
var concat = require('gulp-concat');

var requireConfig = {
  baseUrl: __dirname
};
var options = {
  umd: false
};

gulp.task('default', function () {
  return gulp.src('src/*.js', {base: requireConfig.baseUrl})
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
 * `exclude`: *[string]* List of modules and folders NOT to load. 

### Options

The second argument to amdOptimizer is optional and can be used to change the way modules are found and named. It consists of the following options:

 * `umd`: *boolean* When true, try to find umd modules and name them. See https://github.com/umdjs/umd

### Sourcemap

gulp-amd-optimzer supports the [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps/) plugin. The example below shows how sourcemaps can be used. 

```js
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');

gulp.task('default', function () {
  return gulp.src('src/*.js', { base: amdConfig.baseUrl })
    .pipe(sourcemap.init())
    .pipe(amdOptimize(amdConfig))
    .pipe(concat('modules.js'))
    .pipe(sourcemap.write('./', { includeContent: false, sourceRoot: '../src' }))
    .pipe(gulp.dest('dist'));
});

var amdConfig = {
  baseUrl: 'src',
  path:{
    'lib': '../lib'
  }
  exclude: [
    'jQuery'
  ]
};
```

Sourcemaps can be difficult to get right, so it is a good idea to follow these rules:

* The `base` option passed to `gulp.src` should be the same as `baseUrl` in the `amdConfig`.
* The sourcemap should be written to the same folder (`./`) as the output.
* The sourceRoot should be the relative path from the  destination folder (the argument to `gulp.dest`) to the `base`. 

## License

[MIT](http://opensource.org/licenses/MIT) © [Marius Gundersen](http://mariusgundersen.net)
