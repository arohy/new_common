var gulp = require('gulp');

var init = require('../utils/browserify');

// =========================================================
gulp.task('dev-watch', function () {
  init({
    destDir: './media/',
    file: 'test.js',
    watch: true,
    uglify: false,
  });
});