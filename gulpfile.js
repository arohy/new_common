var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var shell = require('gulp-shell');

// ==============================
gulp.task('default', ['common-watch', 'test-watch'], function() {
  // пустая таска, главное - просто работает )
});

gulp.task('common-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['build-common']
  );
});

gulp.task('test-watch', function() {
  return gulp.watch(['test/js_tests/**/*.js'],
    { cwd: './' },
    ['build-tests']
  );
})

gulp.task('build-common', function() {
  return gulp.src(['source/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('new_common.js'),
      gulp.dest('./test/media')
    ))
});

gulp.task('build-tests', function() {
  return gulp.src(['test/js_tests/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('tests.js'),
      gulp.dest('./test/media')
    ))
});

// переходит в test и запускает сконфигуреный insup
gulp.task('insup-load', shell.task([
  'insup'
], {
  cwd: './test'
}))