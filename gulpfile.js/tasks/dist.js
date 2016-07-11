var gulp = require('gulp');

var init = require('../utils/browserify');

gulp.task('dist', function () {
  init({
    entry: 'new_common.js',
    destDir: './dist/',
    destFile: 'new_common.js',
    destMinFile: 'new_common.min.js',
    watch: false,
    uglify: true,
  });
});