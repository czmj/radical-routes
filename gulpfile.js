'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var markdown = require('markdown');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('fileinclude', function() {

    gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({
            message: "fileInclude tasks have been completed!"
        }));

    gulp.src(['src/img/**/*.{png,jpg,jpeg,gif,webp,svg}'])
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/img'))
        .pipe(gulp.dest('./dist/img'));

    gulp.src(['src/fonts/**/*.*'])
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/fonts'))
        .pipe(gulp.dest('./dist/css/fonts'));
        
    gulp.src(['src/docs/**/*.*'])
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/docs'))
        .pipe(gulp.dest('./dist/docs'));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

});

gulp.task('sass', function() {
    gulp.src('./scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: "SASS tasks have been completed!"
        }));
});

gulp.task('vendor-scripts', function() {
    return gulp
        .src([
            './bower_components/jquery/dist/jquery.js',
            './bower_components/jquery-tiny-pubsub/dist/ba-tiny-pubsub.js',
            './bower_components/slick-carousel/slick/slick.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/js'));
});

gulp.task('module-scripts', function() {
    return gulp
        .src([
            './js/!(_init)*.js', // all files that end in .js EXCEPT _init.js
            '!./js/modernizrTests.js',
            './js/_init.js'

        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/js'))
});

gulp.task('head-scripts', function() {
    return gulp
        .src([
            './bower_components/picturefill/dist/picturefill.js',
            './js/modernizrTests.js'
        ])
        .pipe(concat('head-scripts.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/js'));
});

gulp.task('scripts', ['vendor-scripts', 'head-scripts', 'module-scripts'], function() {
    return gulp
        .src('./public/wp-content/themes/radicalroutes/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/wp-content/themes/radicalroutes/js'))
        .pipe(notify({
            message: "JS/Coffee tasks have been completed!"
        }));
});

gulp.task('watch', ['fileinclude'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*.{png,jpg,jpeg,gif,webp,svg,html,md,woff,woff2}', ['fileinclude']);
    gulp.watch('./js/*.js', ['scripts'])
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'sass', 'fileinclude', 'browser-sync', 'watch']);
