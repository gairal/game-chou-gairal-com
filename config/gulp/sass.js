const conf = require('../config.json'),
gulp = require('gulp'),
sass = require('gulp-sass'),
gulpStylelint = require('gulp-stylelint'),
autoprefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function () {
  'use strict';

  gulp.src([
    conf.base.src + conf.path.sass + conf.files.sassAll,
    '!' + conf.base.src + conf.path.sass + '**/_mixins.scss'
  ])
  .pipe(gulpStylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }))
  .on('error', handleError);

  return gulp.src(conf.base.src + conf.path.sass + conf.files.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.base.build + conf.path.css));
});
