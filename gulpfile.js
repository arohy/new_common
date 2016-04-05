var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var combine = require('stream-combiner');


// ==============================
gulp.task('default', function() {
  gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['build-test']
  );
});

gulp.task('build-test', function() {
  return gulp.src(['source/**/*.js'])
    .pipe(combine(
      plumber(),
      concat('new_common.js'),
      gulp.dest('./test/media')
    ))
})