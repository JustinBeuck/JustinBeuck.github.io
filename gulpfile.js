var gulp = require('gulp'),
   browserSync = require('browser-sync').create(),
   watch = require('gulp-watch'),
   sass = require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps');

// browsersync server
gulp.task('serve', ['sass'], function() {
   browserSync.init({
       server: "./"
   });
   gulp.watch("assets/scss/*.scss", ['sass']);
   gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile Our Sass
gulp.task('sass', function() {
   return gulp
       .src('assets/scss/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('assets/css'))
       .pipe(browserSync.stream());
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// watch Files For Changes
gulp.task('watch', function() {

   // gulp.watch('js/*.js', ['lint', 'scripts']);
   gulp.watch('assets/scss/*.scss', ['sass'])

   // When there is a change, log a message in the console
   .on('change', function(event) {
     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
   });
});

// Default Task
gulp.task('default', ['serve']);