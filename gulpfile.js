const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

const devFolder = './dev';
const buildFolder = './dest';
const srcPugs = [`${devFolder}/views/index.pug`, `${devFolder}/views/blog.pug`];
const destHTML = [`${buildFolder}/index.html`,`${buildFolder}/blog.html`];

browserSync.init({
  server: {
    baseDir: './dest'
  }
});

gulp.task('views', function buildHTML() {
  return gulp.src(srcPugs)
  .pipe(pug())
  .pipe(gulp.dest(`${buildFolder}`))
});

gulp.task('styles', function buildStyles() {
  return gulp.src(`${devFolder}/styles/main.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`${buildFolder}/css`));
});

gulp.task('watch', function () {
  gulp.watch([`${devFolder}/styles/*.scss`, `${devFolder}/views/**/*.pug`, ], ['styles', 'views']);
  gulp.watch(destHTML).on('change', browserSync.reload);
});
