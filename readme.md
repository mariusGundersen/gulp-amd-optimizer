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

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(amdOptimize())
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('dist'));
});
```

### Output

gulp-amd-optimizer accepts JS files containing one or more AMD modules. Anonymous modules are given the name of the file (including the path, relative to the baseUrl, without the `.js` extension). Dependencies of modules are found and a full dependency tree is constructed. Finally the tree is sorted in topological order (from leaves to root nodes) and each module is emitted as a single file.

This plugin does not attempt to concat the files. This is the job of other plugins.


### Options

The method takes the requireJS config file as its first argument. Use this to supply the baseUrl, path and other requireJS configurations. You can also supply a list of modules or paths to exclude from the built file. This is useful when you depend on other libraries, like jQuery. 

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
