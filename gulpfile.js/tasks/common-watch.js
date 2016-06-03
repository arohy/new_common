var gulp = require('gulp');

gulp.task('common-watch', function() {
  return gulp.watch(['source/**/*.js'],
    { cwd: './' },
    ['build-common']
  );
});