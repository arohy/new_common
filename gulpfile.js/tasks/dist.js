var gulp = require('gulp');

var init = require('../utils/browserify');

gulp.task('dist', function () {
  init({
    entry: 'test.js',
    destDir: './dist/',
    destFile: 'test.js',
    destMinFile: 'test2.min.js',
    watch: false,
    uglify: true,
  });
});