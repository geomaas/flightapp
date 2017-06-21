'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let browserify = require('gulp-browserify');
var surge = require('gulp-surge');


gulp.task('default', ['html', 'css', 'js']);

// Add a new templates task.
gulp.task('html', function () {
    // gulp.src('./templates/*.html').pipe(gulp.dest('./public/templates'));
    // // Also copy over the templates directory.
    // gulp.src('./templates/directives/*.html').pipe(gulp.dest('./public/templates/directives'));

    return gulp.src('./index.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('css', function () {
    return gulp.src('./styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./app.js')
        // .pipe(browserify())
        .pipe(gulp.dest('./public/js'))
});

gulp.task('deploy', [], function() {
    return surge({
        project: './public', // Path to your static build directory
        domain: 'lush-juice.surge.sh',
    })
});

gulp.task('watch', function () {
    gulp.watch('./*.js', ['js']);
    gulp.watch('./js/*/*.js', ['js']);
    gulp.watch('./*.scss', ['css']);
    gulp.watch('./index.html', ['html']);
    gulp.watch('./templates/*.html', ['html']);
    gulp.watch('./templates/*/*.html', ['html']);
});
