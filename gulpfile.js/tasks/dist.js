var gulp = require('gulp');

var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var rigger = require('gulp-rigger');

gulp.task('dist', function () {
  return gulp.src(['source/*.js'])
    .pipe(combine(
      plumber(),
      rigger(),
      gulp.dest('./dist')
    ))
});