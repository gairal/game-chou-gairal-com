const conf = require('../config.json'),
gulp = require('gulp'),
del = require('del');

gulp.task('clean', function (cb) {
  'use strict';
  return del([conf.base.build, conf.base.dist], cb);
});
