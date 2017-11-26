var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('lint', function (cb){
  'use strict';
  return runSequence('pug:build', 'sass', 'js:build', cb);
});
