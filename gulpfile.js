const gulp = require('gulp')
    , postcss = require('gulp-postcss')
    , autoprefixer = require('autoprefixer')
    , cleanCSS = require('gulp-clean-css')
    , rename = require('gulp-rename')
    , htmlmin = require('gulp-htmlmin')
    , browserSync = require('browser-sync').create();

gulp.task('serve', ['styles', 'minify'], function() {
  browserSync.init({
    server: { baseDir: "./" }
  });

  gulp.watch('./src/styles.css', ['styles']);
  gulp.watch('./src/index.html', ['minify'], browserSync.reload);
});

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('.'))
});

gulp.task('styles', function() {
  return gulp.src('src/styles.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
