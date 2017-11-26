const gulp = require('gulp'),
runSequence = require('run-sequence');

gulp.task('release', function (cb){
  'use strict';
  runSequence('clean', ['copy:build', 'pug:build', 'sass', 'js:release', 'copy:release', 'imagemin:release'], 'usemin', cb);
});
