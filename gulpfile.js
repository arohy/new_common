var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var shell = require('gulp-shell');

// ==============================
gulp.task('default', ['insup-load','js-watch'], function() {
  // пустая таска, главное - просто работает )
});

gulp.task('js-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['build-test']
  );
})

gulp.task('build-test', function() {
  return gulp.src(['source/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('new_common.js'),
      gulp.dest('./test/media')
    ))
});

// переходит в test и запускает сконфигуреный insup
gulp.task('insup-load', shell.task([
  'insup'
], {
  cwd: './test'
}))