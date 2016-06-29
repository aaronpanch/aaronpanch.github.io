const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const destinationDir = './build/';

gulp.task('serve', ['styles'], function() {
  browserSync.init({
    server: { baseDir: "./" }
  });

  gulp.watch('./styles.css', [ 'styles' ]);
  gulp.watch("./index.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
  return gulp.src('styles.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(destinationDir))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
