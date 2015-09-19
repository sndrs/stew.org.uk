import gulp from 'gulp';
import watch from 'gulp-watch';

import sass from 'gulp-sass';
import minifyCSS from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';
import inline from 'gulp-inline';

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
    gulp.src('./src/style.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src'))
        .pipe(browserSync.stream())
)

gulp.task('build', ['sass'], () =>
    gulp.src('src/index.html')
        .pipe(inline({
            css: minifyCSS()
        }))
        .pipe(gulp.dest('dist/'))
)

import ghPages from 'gulp-gh-pages';

gulp.task('publish', ['build'], function() {
  return gulp.src([
      './dist/**/*'
    ])
    .pipe(ghPages({
        force: true
    }));
});
