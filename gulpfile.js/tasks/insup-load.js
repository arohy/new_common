var gulp = require('gulp');

var shell = require('gulp-shell');

gulp.task('insup-load', shell.task([
  'insup'
]))