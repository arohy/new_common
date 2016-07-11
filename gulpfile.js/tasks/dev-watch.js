var gulp = require('gulp');

var init = require('../utils/browserify');

// =========================================================
gulp.task('dev-watch', function () {
  init({
    entry: 'new_common.js',
    destDir: './media/',
    destFile: 'new_common.js',
    watch: true,
    uglify: false,
  });
});