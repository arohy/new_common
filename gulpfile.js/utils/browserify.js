var gulp = require('gulp');

var browserify = require('browserify');
var uglifyify = require('uglifyify');
var watchify = require('watchify');

var gutil = require('gulp-util');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');

var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

var uglify = require('gulp-uglify');

/**
 * entry - base file
 * destDir - destination target Dir
 * destFile - compiled file name
 * destMinFile - min compiled file name
 * uglify: true/false
 * watch: true/false
 */

// Мумификация,
var minimization = function (b, options) {
  return lazypipe()
    .pipe(buffer)
    .pipe(uglify)
    .pipe(rename, options.destMinFile)
    .pipe(sourcemaps.init, { loadMaps: true })
      // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write, './')
    .pipe(gulp.dest, options.destDir)();
}

// ==========================================================
var build = function (options) {
  var b = browserify({
    entries: './source/' + options.entry,
    debug: true,
    cache: {},
    packageCache: {},
  });

  if (options.watch) {
    b.plugin(watchify)
      .on('update', function () {
        _bundle(b, options);
      })
      .on('log',  gutil.log);
  }

  _bundle(b, options);
}

function _bundle (b, options) {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(options.entry))
    .pipe(gulp.dest(options.destDir))
    .pipe(gulpif(options.uglify, minimization(b, options)));
};

module.exports = build;