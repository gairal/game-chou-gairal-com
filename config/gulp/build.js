const gulp = require('gulp'),
runSequence = require('run-sequence');

gulp.task('build', function (cb){
  'use strict';
  return runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:build'], cb);
});
