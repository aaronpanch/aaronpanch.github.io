var gulp = require('gulp');

var destinationDir = './build/';

gulp.task('autoprefixer', function() {
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');

  return gulp.src('styles.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest(destinationDir));
});

gulp.task('minify', function() {
  var minifyCSS = require('gulp-minify-css');
  var rename = require('gulp-rename');

  return gulp.src('./build/styles.css')
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(destinationDir));
});

gulp.task('watch', function() {
  gulp.watch('./*.css', ['autoprefixer', 'minify']);
});

gulp.task('default', ['autoprefixer', 'minify', 'watch']);
