const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const destinationDir = './build/';

gulp.task('styles', function() {
  return gulp.src('styles.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(destinationDir));
});

gulp.task('watch', function() {
  gulp.watch('./*.css', [ 'styles' ]);
});

gulp.task('default', [ 'styles' ]);
