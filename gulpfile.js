'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths =  {
    src: './src/',              // paths.src
    build: './build/'           // paths.build
};

function styles() {
    return gulp.src(paths.src + 'scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass()) // { outputStyle: 'compressed' }
        .pipe(groupMediaQueries())
        .pipe(cleanCSS())
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'))
}

// function scripts() {
//     return gulp.src(paths.src + 'js/*.js')
//         .pipe(plumber())
//         .pipe(babel({
//             presets: ['env']
//         }))
//         // .pipe(uglify())
//         // .pipe(concat('script.min.js'))
//         .pipe(gulp.dest(paths.build + 'js/'))
// }

function htmls() {
    return gulp.src(paths.src + '*.html')
        .pipe(plumber())
        .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
        .pipe(gulp.dest(paths.build));
}

function copyJs() {
    return gulp.src(paths.src + 'js/**')
        .pipe(gulp.dest(paths.build + 'js/'))
}

function copyImages() {
    return gulp.src(paths.src + 'img/**/**/**')
        .pipe(gulp.dest(paths.build + 'img/'))
}

function copyFonts() {
    return gulp.src(paths.src + 'fonts/**/**')
        .pipe(gulp.dest(paths.build + 'fonts/'))
}

function clean() {
    return del('build/')
}

function watch() {
    gulp.watch(paths.src + 'scss/*.scss', styles);
    // gulp.watch(paths.src + 'js/*.js', scripts);
    gulp.watch(paths.src + '*.html', htmls);
    gulp.watch(paths.src + 'img/**', copyImages);
    gulp.watch(paths.src + 'fonts/**', copyFonts);
    gulp.watch(paths.src + 'js/**', copyJs);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
// exports.scripts = scripts;
exports.htmls = htmls;
exports.clean = clean;
exports.watch = watch;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
exports.copyJs = copyJs;

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, htmls, copyImages, copyFonts, copyJs)
));

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, htmls, copyImages, copyFonts, copyJs),
    gulp.parallel(watch, serve)
));
