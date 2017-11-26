const gulp = require('gulp'),
runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  'use strict';
  runSequence('build', 'browser-sync:build', 'watch', cb);
});

gulp.task('run:dist', function (cb) {
  'use strict';
  runSequence('release', 'browser-sync:dist', cb);
});
