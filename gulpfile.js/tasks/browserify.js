var gulp = require('gulp');
var browserify = require('browserify');

var buffer = require('gulp-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var _enrty = './source/test.js';

gulp.task('browserify-build', function () {
  var b = browserify({
    entries: _enrty,
    debug: false
  });

  return b.bundle()
    .pipe(source('test.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest('./media/'));
});

gulp.task('browserify-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['browserify-build']
  );
});