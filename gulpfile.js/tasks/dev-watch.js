var gulp = require('gulp');

var init = require('../utils/browserify');

// =========================================================
gulp.task('dev-watch', function () {
  init({
    entry: 'test.js',
    destDir: './media/',
    destFile: 'test.js',
    watch: true,
    uglify: false,
  });
});