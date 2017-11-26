const conf = require('../config.json'),
gulp = require('gulp'),
imagemin = require('gulp-imagemin');

gulp.task('imagemin:release', function() {
  'use strict';
  return gulp.src([conf.base.src + conf.path.images + conf.files.images], {base: './' + conf.base.src})
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest(conf.base.dist));
});
