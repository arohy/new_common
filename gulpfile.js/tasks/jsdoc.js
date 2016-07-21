var gulp = require('gulp');

var jsdoc = require('gulp-jsdoc');

var src = './source/**/*.js'

gulp.task('jsdoc', function () {
  return gulp.src(src)
    .pipe(jsdoc('./documentation'))
});

gulp.task('jsdoc-watch', function () {
  gulp.watch(src, { cwd: './' }, ['jsdoc']);
});