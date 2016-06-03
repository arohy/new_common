var gulp = require('gulp');

gulp.task('test-watch', function() {
  return gulp.watch(['test/js_tests/**/*.js'],
    { cwd: './' },
    ['build-tests']
  );
})