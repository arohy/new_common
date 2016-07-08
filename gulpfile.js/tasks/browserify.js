var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');

var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var options = {
  file: 'test.js',
  destDir: './media/'
};

var b = watchify(browserify({
  entries: './source/' + options.file,
  debug: false,

  cache: {},
  packageCache: {},
}));

gulp.task('browserify-watch', bundle);

b.on('update', bundle);
b.on('log',  gutil.log);

//========================
function bundle () {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(options.file))
    .pipe(gulp.dest(options.destDir));
};