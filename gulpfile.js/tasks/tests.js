var gulp = require('gulp');

var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var rigger = require('gulp-rigger');

gulp.task('test-watch', function() {
  return gulp.watch(['test/js_tests/**/*.js'],
    { cwd: './' },
    ['test-build']
  );
})

gulp.task('test-build', function() {
  return gulp.src(['test/js_tests/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('tests.js'),
      gulp.dest('./test/media')
    ))
});