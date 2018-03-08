'use strict';

const 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed');

let SCSS_SRC  = './src/Assets/scss/**/*.scss';
let SCSS_DEST = './src/Assets/css';

gulp.task('compile_scss', function() {
    gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

gulp.task('watch_scss', function() {
    gulp.watch(SCSS_SRC, ['compile_scss']);
});

gulp.task('default', ['watch_scss'])