var gulp = require('gulp');

var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var rigger = require('gulp-rigger');

gulp.task('build-tests', function() {
  return gulp.src(['test/js_tests/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('tests.js'),
      gulp.dest('./test/media')
    ))
});