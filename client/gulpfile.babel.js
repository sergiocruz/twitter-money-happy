'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var tap = require('gulp-tap');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');
var exorcist = require('exorcist');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var domain = require('domain');

// Browsersync Reload
var reload = browserSync.reload;

// Input file.
watchify.args.debug = true;
// let bundler = watchify(browserify('app/client.js', watchify.args));
var bundler = browserify('app/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red("Browserify compile error:"), err.message);
      gutil.beep();
      browserSync.notify('Browserify Error!');
      this.emit('end');
    })
    .pipe(exorcist('public/assets/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', ['styles'], () => {
  return bundle();
});

/**
 * First bundle, then serve from the public directory
 */
gulp.task('default', ['bundle'], () => {
  browserSync.init({
    server: 'public'
  });

});

gulp.task('styles', () => {
  return gulp.src('app/stylesheets/*.scss')
    .pipe(plumber())
    // .pipe($.sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    // .pipe($.autoprefixer({browsers: ['last 1 version']}))
    // .pipe($.uncss({
    //   html: ['app/*.html']
    // }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe(bundle());
    // .pipe(reload({stream: true}));
});

gulp.task('watch', ['default'], () => {

  gulp.watch('app/stylesheets/**/*.scss', ['styles']);
  gulp.watch('app/**/*.js', ['bundle']);
  gulp.watch('public/**/*.html', ['bundle']);

});
