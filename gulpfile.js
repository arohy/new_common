var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var shell = require('gulp-shell');
var rigger = require('gulp-rigger');

// ==============================
// таска дял Win
gulp.task('default', ['common-watch'], function() {
  // пустая таска, главное - просто работает )
});

gulp.task('dist', function () {
  return gulp.src(['source/*.js'])
    .pipe(combine(
      plumber(),
      rigger(),
      gulp.dest('./dist')
    ))
});

gulp.task('common-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['build-common']
  );
});

gulp.task('build-common', function() {
  return gulp.src(['source/*.js'])
    .pipe(combine(
      plumber(),
      rigger(),
      gulp.dest('./dev')
    ))
});