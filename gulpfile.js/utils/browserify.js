var gulp = require('gulp');

var browserify = require('browserify');
var uglifyify = require('uglifyify');
var watchify = require('watchify');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

// Сборка мап,
var makeJSMap = lazypipe()
  .pipe(sourcemaps.init, { loadMaps: true })
    // Add transformation tasks to the pipeline here.
  .pipe(sourcemaps.write, './');

// ==========================================================
var build = function (options) {
  var b = browserify({
    entries: './source/' + options.file,
    debug: true,
    cache: {},
    packageCache: {},
  });

  if (options.uglify) {
    b.transform({
      global: true
    }, uglifyify);
  }

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
    .pipe(source(options.file))
    .pipe(buffer())
    .pipe(gulpif(options.uglify, makeJSMap()))
    .pipe(gulp.dest(options.destDir));
};

module.exports = build;