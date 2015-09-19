import gulp from 'gulp';
import watch from 'gulp-watch';

import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import bs from 'browser-sync';

const browserSync = bs.create();

gulp.task('default', ['sass'], () => {
    browserSync.init({
        "server": true,
        "port": 3000,
        "minify": false
    });
    gulp.watch('style.scss', ['sass']);
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('sass', () =>
    gulp.src('style.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream())
)

import ghPages from 'gulp-gh-pages';

gulp.task('publish', ['sass'], function() {
  return gulp.src([
      'style.css',
      'index.html'
    ])
    .pipe(ghPages({
        force: true
    }));
});