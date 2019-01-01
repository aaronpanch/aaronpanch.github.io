const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const inlineSource = require("gulp-inline-source");
const browserSync = require("browser-sync").create();

const minify = () =>
  gulp
    .src("src/*.html")
    .pipe(inlineSource())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("."));

const styles = () =>
  gulp
    .src("src/styles.css")
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(cleanCSS())
    .pipe(gulp.dest("."))
    .pipe(browserSync.stream());

const build = gulp.parallel(styles, minify);

const watchAndServe = () => {
  browserSync.init({
    server: { baseDir: "./" }
  });

  gulp.watch("src/styles.css", gulp.parallel(styles, minify));
  gulp.watch("src/index.html", minify);
  gulp.watch("./index.html", browserSync.reload);
};

exports.serve = gulp.series(gulp.parallel(styles, minify), watchAndServe);
exports.build = build;
exports.default = build;
