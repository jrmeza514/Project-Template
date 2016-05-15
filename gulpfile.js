const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
gulp.task('default', ['sass', 'jade', 'js', 'browserify', 'watch', 'sync']);


gulp.task('sass', () => {
  gulp.src('dev/sass/**/*.scss')
      .pipe( sass() )
      .pipe( gulp.dest('css/') )
      .pipe( browserSync.stream() );
});

gulp.task('jade', () => {
  gulp.src('dev/**/*.jade')
      .pipe( jade({
        pretty: true
      }))
      .pipe( gulp.dest('./') )
      .pipe( browserSync.stream() );
});

gulp.task('js', () => {
    gulp.src(['dev/js/**/*.js', '!dev/js/app.js'])
        .pipe( gulp.dest('js/') )
        .pipe( browserSync.stream() );
});

gulp.task('browserify', () => {
  gulp.src('dev/js/app.js')
     .pipe(browserify({
       insertGlobals : true,
       debug : !gulp.env.production
     }))
     .pipe( gulp.dest('js/') )
     .pipe( browserSync.stream() );
})
gulp.task('sync', () => {
  browserSync.init({
    server: './',
    logFileChanges: false
  });
});

gulp.task('watch', () => {
  gulp.watch('dev/sass/**/*.scss', ['sass']);
  gulp.watch('dev/**/*.jade', ['jade']);
  gulp.watch('dev/js/**/*.js', ['js']);
  gulp.watch('dev/js/app.js', ['browserify']);
  gulp.watch('dev/modules/**/*.js', ['browserify']);
});
