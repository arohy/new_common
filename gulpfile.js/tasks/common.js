var gulp = require('gulp');

var plumber = require('gulp-plumber');
var combine = require('stream-combiner');
var rigger = require('gulp-rigger');

gulp.task('common-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['common-build']
  );
});

gulp.task('common-build', function() {
  return gulp.src(['source/*.js'])
    .pipe(combine(
      plumber(),
      rigger(),
      gulp.dest('./media')
    ))
});