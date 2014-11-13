var gulp = require('gulp');

gulp.task('autoprefixer', function() {
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');

  return gulp.src('style.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('./dist'));
});
