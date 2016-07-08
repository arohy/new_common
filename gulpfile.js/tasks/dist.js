var gulp = require('gulp');

var init = require('../utils/browserify');

gulp.task('dist', function () {
  init({
    destDir: './dist/',
    file: 'test.js',
    watch: false,
    uglify: true,
  });
});