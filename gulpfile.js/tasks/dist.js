var gulp = require('gulp');

var browserify = require('browserify');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var options = {
  file: 'test.js',
  destDir: './dist/'
};

var b = browserify({
  entries: './source/' + options.file,
  debug: false,

  cache: {},
  packageCache: {},
});

gulp.task('dist', bundle);


//========================
function bundle () {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(options.file))
    .pipe(gulp.dest(options.destDir));
};