var gulp = require('gulp');

var jsdoc = require('gulp-jsdoc3');

var src = './source/**/*.js'

var config = require('../config/jsdoc/conf.json');

gulp.task('jsdoc', function () {
  return gulp.src(src, {read: false})
    .pipe(jsdoc(config))
});

gulp.task('jsdoc-watch', function () {
  gulp.watch(src, { cwd: './' }, ['jsdoc']);
});